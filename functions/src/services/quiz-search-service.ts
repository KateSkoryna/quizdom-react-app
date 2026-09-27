import { createHash } from "node:crypto";
import { quizSchema } from "../schemas/quizSchema";
import { normalizeQuizTitle } from "../utils/quizTitle";
import type { UserQuiz } from "../types/quiz";
import type {
  ComplexityValue,
  ExtractedSearchIntent,
  QuizCategoryValue,
  ScoredQuiz,
  SearchableQuiz,
  SearchFilters,
  SemanticSearchDependencies,
  SemanticSearchRequest,
  SemanticSearchResult,
} from "../types/search";

export const QUIZ_CATEGORIES = quizSchema.shape.category.options;
export const QUIZ_COMPLEXITIES = quizSchema.shape.complexity.options;

export const MAX_SEARCH_QUERY_LENGTH = 300;
export const MAX_SEARCH_LIMIT = 50;
export const DEFAULT_SEARCH_LIMIT = 10;
// Cosine similarity floor for gemini-embedding-001 results: relevant quizzes score ~0.57-0.75,
// unrelated queries (cooking, sports, prompt-injection text) top out around 0.56
export const DEFAULT_MIN_SCORE = 0.6;
const VECTOR_CANDIDATE_MULTIPLIER = 3;
const MAX_QUESTIONS_IN_EMBEDDING = 25;

export const isQuizCategory = (value: unknown): value is QuizCategoryValue =>
  typeof value === "string" && (QUIZ_CATEGORIES as readonly string[]).includes(value);

export const isComplexity = (value: unknown): value is ComplexityValue =>
  typeof value === "string" && (QUIZ_COMPLEXITIES as readonly string[]).includes(value);

export const buildQuizEmbeddingText = (quiz: SearchableQuiz): string => {
  const questionLines = (quiz.questions ?? [])
    .slice(0, MAX_QUESTIONS_IN_EMBEDDING)
    .map((question) => `- ${question.questionTitle.trim()}`);

  return [
    `Title: ${quiz.title.trim()}`,
    `Description: ${quiz.description.trim()}`,
    `Category: ${quiz.category}`,
    `Difficulty: ${quiz.complexity}`,
    "Questions:",
    ...questionLines,
  ].join("\n");
};

export const hashEmbeddingText = (text: string, model: string): string =>
  createHash("sha256").update(`${model}\n${text}`).digest("hex");

const CATEGORY_PATTERNS: Array<[QuizCategoryValue, RegExp]> = [
  ["NextJS", /\bnext(?:\.js|js|\s+js)\b|\bapp router\b/i],
  ["NodeJS", /\bnode(?:\.js|js)?\b|\bexpress(?:\.js|js)?\b/i],
  ["TypeScript", /\btypescript\b|\bts\b/i],
  ["ReactJS", /\breact(?:\.js|js)?\b|\bhooks?\b|\bjsx\b/i],
  ["Jest", /\bjest\b|\bunit tests?\b|\btesting\b/i],
  ["Web Accessibility", /\baccessib\w*|\ba11y\b|\bwcag\b|\baria\b|\bscreen readers?\b/i],
  ["Web Performance", /\bperformance\b|\bcore web vitals\b|\blcp\b|\bcls\b|\blazy[- ]loading\b/i],
  ["HTTP & REST APIs", /\bhttp\b|\brest(?:ful)?\b|\bapis?\b|\bstatus codes?\b/i],
  ["Web Fundamentals", /\bhtml\b|\bcss\b|\bdom\b|\bbrowsers?\b|\bweb fundamentals\b/i],
  // Generic "js"/"javascript" spans Node, React, Next etc., so only plain JS or core features map here
  [
    "JavaScript",
    /\b(?:vanilla|plain)\s+(?:js|javascript)\b|\becmascript\b|\bes6\b|\bclosures?\b|\bpromises?\b/i,
  ],
];

const COMPLEXITY_PATTERNS: Array<[ComplexityValue, RegExp]> = [
  ["Beginner", /\b(beginners?|easy|basics?|intro(?:ductory)?|newbies?|juniors?|starter)\b/i],
  ["Medium", /\b(medium|intermediate|mid[- ]level|moderate)\b/i],
  ["Advanced", /\b(advanced|hard|difficult|challenging|seniors?)\b/i],
  ["Expert", /\b(experts?|mastery|deep[- ]dive|internals)\b/i],
];

export const extractIntentHeuristically = (query: string): ExtractedSearchIntent => {
  const category = CATEGORY_PATTERNS.find(([, pattern]) => pattern.test(query))?.[0];
  const complexity = COMPLEXITY_PATTERNS.find(([, pattern]) => pattern.test(query))?.[0];

  return {
    category,
    complexity,
    semanticQuery: query.trim(),
    source: "heuristic",
  };
};

export const resolveFilters = (
  explicit: SearchFilters | undefined,
  intent: ExtractedSearchIntent
): SearchFilters => {
  const filters: SearchFilters = {};

  const category = explicit?.category ?? intent.category;
  if (category) filters.category = category;

  const complexity = explicit?.complexity ?? intent.complexity;
  if (complexity) filters.complexity = complexity;

  return filters;
};

const matchesFilters = (quiz: UserQuiz, filters: SearchFilters): boolean =>
  (!filters.category || quiz.category === filters.category) &&
  (!filters.complexity || quiz.complexity === filters.complexity);

const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}#+.]+/u)
    .map((token) => token.replace(/^\.+|\.+$/g, ""))
    .filter((token) => token.length > 1);

export const rankByKeywords = (quizzes: UserQuiz[], query: string): ScoredQuiz[] => {
  const queryTokens = [...new Set(tokenize(query))];
  if (queryTokens.length === 0) return [];

  return quizzes
    .map((quiz) => {
      const titleTokens = new Set(tokenize(quiz.title));
      const bodyTokens = new Set(
        tokenize(
          [
            quiz.description,
            quiz.category,
            ...(quiz.questions ?? []).map((question) => question.questionTitle),
          ].join(" ")
        )
      );

      const weight = queryTokens.reduce((sum, token) => {
        if (titleTokens.has(token)) return sum + 2;
        if (bodyTokens.has(token)) return sum + 1;
        return sum;
      }, 0);

      return { quiz, score: weight / (queryTokens.length * 2) };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
};

// Results arrive best-first, so keeping the first quiz per title keeps the most relevant one
const dedupeByTitle = (results: ScoredQuiz[]): ScoredQuiz[] => {
  const seen = new Set<string>();
  return results.filter(({ quiz }) => {
    const key = normalizeQuizTitle(quiz.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const runVectorSearch = async (
  deps: SemanticSearchDependencies,
  queryVector: number[],
  filters: SearchFilters,
  limit: number,
  minScore: number
): Promise<ScoredQuiz[]> => {
  const matches = await deps.vectorStore.findNearest(
    queryVector,
    filters,
    limit * VECTOR_CANDIDATE_MULTIPLIER
  );
  if (matches.length === 0) return [];

  const quizzes = await deps.getQuizzesByIds(matches.map((match) => match.quizId));
  const quizById = new Map(quizzes.map((quiz) => [quiz.id, quiz]));

  const results = matches
    .map((match) => ({ quiz: quizById.get(match.quizId), score: 1 - match.distance }))
    .filter(
      (entry): entry is ScoredQuiz =>
        entry.quiz !== undefined &&
        entry.quiz.status === "done" &&
        matchesFilters(entry.quiz, filters) &&
        entry.score >= minScore
    );

  return dedupeByTitle(results).slice(0, limit);
};

const runKeywordSearch = async (
  deps: SemanticSearchDependencies,
  query: string,
  filters: SearchFilters,
  limit: number
): Promise<ScoredQuiz[]> => {
  const candidates = await deps.getKeywordCandidates(filters);
  return dedupeByTitle(
    rankByKeywords(
      candidates.filter((quiz) => matchesFilters(quiz, filters)),
      query
    )
  ).slice(0, limit);
};

const safeExtractIntent = async (
  deps: SemanticSearchDependencies,
  query: string
): Promise<ExtractedSearchIntent> => {
  try {
    return await deps.extractIntent(query);
  } catch (error) {
    deps.logger?.warn("LLM filter extraction failed, using heuristic extraction", error);
    return extractIntentHeuristically(query);
  }
};

export const searchQuizzesSemantically = async (
  deps: SemanticSearchDependencies,
  request: SemanticSearchRequest
): Promise<SemanticSearchResult> => {
  const query = request.query.trim();
  const intent = await safeExtractIntent(deps, query);
  // Filters read from the query are kept even when nothing matches them, so the
  // user sees "no quizzes" rather than results for a topic or level they did not ask for
  const filters = resolveFilters(request.filters, intent);

  if (intent.offTopic) {
    return {
      mode: "semantic",
      results: [],
      appliedFilters: filters,
      intent,
      offTopic: true,
    };
  }

  const embeddingText = intent.semanticQuery.trim() || query;

  let queryVector: number[] | null = null;
  try {
    queryVector = await deps.embedQuery(embeddingText);
  } catch (error) {
    deps.logger?.warn("Query embedding failed, falling back to keyword search", error);
  }

  const results = queryVector
    ? await runVectorSearch(
        deps,
        queryVector,
        filters,
        request.limit,
        request.minScore ?? DEFAULT_MIN_SCORE
      )
    : await runKeywordSearch(deps, query, filters, request.limit);

  return {
    mode: queryVector ? "semantic" : "keyword",
    results,
    appliedFilters: filters,
    intent,
    offTopic: false,
  };
};
