/**
 * Shared constants for quiz functions
 */

export const COLLECTIONS = {
  QUIZZES: "quizzes",
  QUIZ_COMPLETIONS: "quizCompletions",
  USERS: "users",
  FAVORITES: "favorites",
  LIKES: "likes",
  QUIZ_EMBEDDINGS: "quizEmbeddings",
} as const;

export enum ACTION {
  ADD = "add",
  REMOVE = "remove",
}

export const corsOptions = {
  cors: [
    "https://kateskoryna.github.io",
    // Firebase Hosting preview channels; only this project can create these subdomains
    /^https:\/\/quizdom-react-app--[a-z0-9-]+\.web\.app$/,
  ],
  invoker: "public" as const,
};
