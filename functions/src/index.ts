import * as admin from "firebase-admin";

admin.initializeApp();

// Quiz Completion (unified attempts + feedback)
export {
  completeQuiz,
  getQuizCompletionStatus,
  getAllUserCompletions,
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

// AI Quiz Generation
export { generateQuiz } from "./api/quiz/generateQuiz";

// Favorites
export { toggleFavorite, getUserFavorites, getFavoriteQuizzes } from "./api/quiz/favorites";

// Likes
export { toggleLike, getUserLikes } from "./api/quiz/likes";

// User Auth
export { login } from "./api/user/users";
