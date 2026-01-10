/**
 * Shared constants for quiz functions
 */

export const COLLECTIONS = {
  QUIZZES: "quizzes",
  QUIZ_COMPLETIONS: "quizCompletions",
  USERS: "users",
  FAVORITES: "favorites",
  LIKES: "likes",
} as const;

export enum ACTION {
  ADD = "add",
  REMOVE = "remove",
}

export const corsOptions = {
  cors: ["https://kateskoryna.github.io"],
  invoker: "public" as const,
};
