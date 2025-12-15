/**
 * Firebase Cloud Functions for Quizdom
 *
 * All functions use onRequest (no Express dependency)
 */

import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Quiz Completion (unified attempts + feedback)
export {
  completeQuiz,
  getQuizCompletionStatus,
  updateQuizCompletionFeedback,
} from "./api/quiz/attempts";

// Quiz Validation
export {
  validateQuizData,
  validateQuizOnCreate,
  validateQuizOnUpdate,
} from "./api/quiz/validation";
