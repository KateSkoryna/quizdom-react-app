import { getFunctions, httpsCallable } from "firebase/functions";
import { QuizFormState } from "../../shared/types";

const functions = getFunctions();

/**
 * Validates quiz data using Firebase Cloud Function
 * Throws an error if validation fails with descriptive message
 */
export async function validateQuizData(
  quizData: QuizFormState
): Promise<QuizFormState> {
  try {
    const validateQuiz = httpsCallable(functions, "validateQuizData");
    const result = await validateQuiz(quizData);

    // TypeScript type assertion for the result
    const data = result.data as { success: boolean; data: QuizFormState };

    if (data.success) {
      return data.data;
    }

    throw new Error("Quiz validation failed");
  } catch (error: any) {
    // Extract meaningful error message
    const errorMessage = error.message || "Quiz validation failed";
    throw new Error(errorMessage);
  }
}
