import { QuizFormState } from "../../shared/src/types";
import apiClient from "../fetchers/axiosInstance";

/**
 * Validates quiz data using Firebase Cloud Function
 * Throws an error if validation fails with descriptive message
 */
export async function validateQuizData(quizData: QuizFormState): Promise<QuizFormState> {
  try {
    const response = await apiClient.post("/validateQuizData", quizData);
    const data = response.data;

    if (data.success) {
      return data.data;
    }

    throw new Error("Quiz validation failed");
  } catch (error: any) {
    const errorMessage = error.error || error.message || "Quiz validation failed";
    throw new Error(errorMessage);
  }
}
