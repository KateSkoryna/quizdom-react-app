import type { UserQuiz } from "./quiz";
import type { QuizSchemaType } from "../schemas/quizSchema";

export type QuizCategoryValue = QuizSchemaType["category"];
export type ComplexityValue = QuizSchemaType["complexity"];

export interface SearchFilters {
  category?: QuizCategoryValue;
  complexity?: ComplexityValue;
}

export interface ExtractedSearchIntent extends SearchFilters {
  topic?: string;
  semanticQuery: string;
  offTopic?: boolean;
  source: "llm" | "heuristic";
}

export type SearchableQuiz = Pick<
  UserQuiz,
  "title" | "description" | "category" | "complexity" | "questions"
>;

export interface QuizEmbeddingRecord {
  quizId: string;
  embedding: number[];
  category: string;
  complexity: string;
  contentHash: string;
}

export interface VectorMatch {
  quizId: string;
  distance: number;
}

export interface VectorStore {
  findNearest(queryVector: number[], filters: SearchFilters, limit: number): Promise<VectorMatch[]>;
}

export interface SemanticSearchDependencies {
  extractIntent: (query: string) => Promise<ExtractedSearchIntent>;
  embedQuery: (text: string) => Promise<number[]>;
  vectorStore: VectorStore;
  getQuizzesByIds: (ids: string[]) => Promise<UserQuiz[]>;
  getKeywordCandidates: (filters: SearchFilters) => Promise<UserQuiz[]>;
  logger?: { warn: (message: string, meta?: unknown) => void };
}

export interface SemanticSearchRequest {
  query: string;
  limit: number;
  filters?: SearchFilters;
  minScore?: number;
}

export interface ScoredQuiz {
  quiz: UserQuiz;
  score: number;
}

export interface SemanticSearchResult {
  mode: "semantic" | "keyword";
  results: ScoredQuiz[];
  appliedFilters: SearchFilters;
  intent: ExtractedSearchIntent;
  offTopic: boolean;
}
