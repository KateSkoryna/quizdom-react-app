/**
 * QuizScore - Stores quiz result details
 *
 * @property totalQuestions - Total number of questions in the quiz
 * @property correctAnswers - Number of questions answered correctly
 * Note: Percentage is calculated on frontend: (correctAnswers / totalQuestions) * 100
 */
export interface QuizScore {
  totalQuestions: number;
  correctAnswers: number;
}

/**
 * QuizCompletion - Unified record of user's quiz completion and optional feedback
 *
 * One completion record per user per quiz (1 attempt limit).
 * Combines completion data (score, when completed) with optional user feedback (rating, comment).
 *
 * @property quizId - The quiz that was completed
 * @property userId - The user who completed the quiz
 * @property score - Score details (totalQuestions, correctAnswers)
 * @property completedAt - When the quiz was completed
 * @property rating - Optional 1-5 star rating (added later by user)
 * @property comment - Optional text feedback (added later by user)
 * @property feedbackUpdatedAt - When rating/comment was last updated
 */
export interface QuizCompletion {
  quizId: string;
  userId: string;
  score: QuizScore;
  completedAt: Date;
  rating?: number;
  comment?: string;
  feedbackUpdatedAt?: Date;
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
  ratingsCount?: number;
  status?: "done" | "draft";
  likesCount?: number;
};

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
  status: "done" | "draft";
}
