// Import base quiz types from index
import type { Answer, Question, QuizFormState, UserQuiz } from "./index";
import { QuizCategory, Complexity } from "./index";

// Re-export base types
export type { Answer, Question, QuizFormState, UserQuiz };
export { QuizCategory, Complexity };

export type QuizId = {
  id: string;
};

export interface Feedback {
  userId: string;
  userName: string;
  message: string;
  createdAt: Date;
}

export interface QuizAttempt {
  id?: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  completed: boolean;
  score?: number;
  completedAt?: Date;
  feedbackLeft: boolean;
}

export type UserLocalQuiz = {
  title: string;
  description: string;
  complexity: Complexity;
  category: QuizCategory;
  questions: Question[];
  authorId: string;
  authorName: string;
  publishedAt: Date;
  rating?: number;
  likesCount?: number;
  feedbacks?: Feedback[];
};


