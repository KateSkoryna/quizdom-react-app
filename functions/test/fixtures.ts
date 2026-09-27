import type { UserQuiz } from "../src/types/quiz";
import type {
  ExtractedSearchIntent,
  SearchFilters,
  SemanticSearchDependencies,
  VectorMatch,
  VectorStore,
} from "../src/types/search";
import { buildQuizEmbeddingText } from "../src/services/quiz-search-service";

const VOCABULARY = [
  "react",
  "hooks",
  "useeffect",
  "state",
  "typescript",
  "generics",
  "types",
  "node",
  "streams",
  "event",
  "loop",
  "async",
  "accessibility",
  "aria",
  "screen",
  "reader",
  "css",
  "grid",
  "layout",
];

export const embedByVocabulary = (text: string): number[] => {
  const words = text.toLowerCase().split(/[^a-z]+/);
  return VOCABULARY.map((term) => words.filter((word) => word === term).length);
};

const cosineDistance = (a: number[], b: number[]): number => {
  const dot = a.reduce((sum, value, i) => sum + value * b[i], 0);
  const norm = (v: number[]) => Math.sqrt(v.reduce((sum, value) => sum + value * value, 0));
  const denominator = norm(a) * norm(b);
  return denominator === 0 ? 1 : 1 - dot / denominator;
};

type QuizOverrides = Omit<Partial<UserQuiz>, "category" | "complexity"> &
  Pick<UserQuiz, "id"> & { category?: string; complexity?: string };

export const makeQuiz = (overrides: QuizOverrides): UserQuiz =>
  ({
    title: "Untitled quiz",
    description: "A quiz description",
    category: "Other",
    complexity: "Medium",
    status: "done",
    authorId: "author",
    authorName: "Author",
    publishedAt: { seconds: 0, nanoseconds: 0 },
    questions: [],
    ...overrides,
  }) as UserQuiz;

export const QUIZZES: UserQuiz[] = [
  makeQuiz({
    id: "react-hooks-beginner",
    title: "React Hooks Basics",
    description: "Learn how useEffect and state hooks work in React components.",
    category: "ReactJS",
    complexity: "Beginner",
    questions: [
      { questionTitle: "When does useEffect run?", answers: [], hint: "Render" },
      { questionTitle: "What does a state setter return?", answers: [], hint: "Hooks" },
    ],
  }),
  makeQuiz({
    id: "react-hooks-expert",
    title: "React Hooks Internals",
    description: "Deep dive into hooks, state queues and useEffect scheduling in React.",
    category: "ReactJS",
    complexity: "Expert",
  }),
  makeQuiz({
    id: "ts-generics",
    title: "TypeScript Generics",
    description: "Generics and advanced types in TypeScript.",
    category: "TypeScript",
    complexity: "Advanced",
  }),
  makeQuiz({
    id: "node-event-loop",
    title: "Node Event Loop",
    description: "Async streams and the event loop in Node.",
    category: "NodeJS",
    complexity: "Medium",
  }),
  makeQuiz({
    id: "a11y-aria",
    title: "ARIA for Screen Reader Users",
    description: "Accessibility patterns with aria attributes and screen reader testing.",
    category: "Web Accessibility",
    complexity: "Beginner",
  }),
  makeQuiz({
    id: "react-draft",
    title: "React Hooks Draft",
    description: "Unpublished hooks quiz about useEffect and state.",
    category: "ReactJS",
    complexity: "Beginner",
    status: "draft",
  }),
];

export class InMemoryVectorStore implements VectorStore {
  readonly calls: SearchFilters[] = [];
  private readonly records: Array<{
    quizId: string;
    embedding: number[];
    category: string;
    complexity: string;
  }>;

  constructor(quizzes: UserQuiz[], extraIds: string[] = []) {
    this.records = [
      ...quizzes.map((quiz) => ({
        quizId: quiz.id,
        embedding: embedByVocabulary(buildQuizEmbeddingText(quiz)),
        category: quiz.category,
        complexity: quiz.complexity,
      })),
      ...extraIds.map((quizId) => ({
        quizId,
        embedding: embedByVocabulary("react hooks useeffect state"),
        category: "ReactJS",
        complexity: "Beginner",
      })),
    ];
  }

  async findNearest(
    queryVector: number[],
    filters: SearchFilters,
    limit: number
  ): Promise<VectorMatch[]> {
    this.calls.push({ ...filters });
    return this.records
      .filter(
        (record) =>
          (!filters.category || record.category === filters.category) &&
          (!filters.complexity || record.complexity === filters.complexity)
      )
      .map((record) => ({
        quizId: record.quizId,
        distance: cosineDistance(queryVector, record.embedding),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  }
}

export const makeDeps = (
  overrides: Partial<SemanticSearchDependencies> & {
    intent?: Partial<ExtractedSearchIntent>;
    quizzes?: UserQuiz[];
    orphanEmbeddingIds?: string[];
  } = {}
) => {
  const quizzes = overrides.quizzes ?? QUIZZES;
  const vectorStore = new InMemoryVectorStore(quizzes, overrides.orphanEmbeddingIds);
  const byId = new Map(quizzes.map((quiz) => [quiz.id, quiz]));

  const deps: SemanticSearchDependencies = {
    extractIntent: async (query) => ({
      semanticQuery: query,
      source: "llm",
      ...overrides.intent,
    }),
    embedQuery: async (text) => embedByVocabulary(text),
    vectorStore,
    getQuizzesByIds: async (ids) =>
      ids.map((id) => byId.get(id)).filter((quiz): quiz is UserQuiz => quiz !== undefined),
    getKeywordCandidates: async () => quizzes.filter((quiz) => quiz.status === "done"),
    logger: { warn: () => undefined },
    ...overrides,
  };

  return { deps, vectorStore };
};
