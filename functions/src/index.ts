import * as admin from "firebase-admin";

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

// Quiz CRUD
export {
  getQuizzes,
  getQuizById,
  getQuizzesByUserId,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "./api/quiz/quizzes";

// Favorites
export { toggleFavorite, getUserFavorites, getFavoriteQuizzes } from "./api/quiz/favorites";
