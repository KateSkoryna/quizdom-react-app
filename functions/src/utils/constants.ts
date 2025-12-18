/**
 * Shared constants for quiz functions
 */

export const COLLECTIONS = {
  QUIZZES: "quizzes",
  QUIZ_COMPLETIONS: "quizCompletions",
  USERS: "users",
} as const;

export enum ACTION {
  ADD = "add",
  REMOVE = "remove",
}
