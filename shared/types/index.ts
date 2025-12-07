// Base quiz types (used by schema)
export interface Answer {
  answer: string;
  isCorrect: boolean;
}

export interface Question {
  questionTitle: string;
  answers: Answer[];
  hint?: string;
}

export enum QuizCategory {
  JS = "JavaScript",
  TS = "TypeScript",
  REACT = "ReactJS",
  NEXT_JS = "NextJS",
  NODE_JS = "NodeJS",
  JEST = "Jest",
  OTHER = "Other",
}

export enum Complexity {
  BEGINNER = "1",
  MEDIUM = "2",
  ADVANCED = "3",
  EXPERT = "4",
}

export interface QuizFormState {
  title: string;
  description: string;
  complexity: Complexity;
  category: QuizCategory;
  questions: Question[];
}

export interface UserQuiz extends QuizFormState {
  id: string;
  authorId: string;
  authorName: string;
  publishedAt: Date;
  rating?: number;
  likesCount?: number;
}

// Re-export all shared types from split files
export * from "./user";
export * from "./quiz";
