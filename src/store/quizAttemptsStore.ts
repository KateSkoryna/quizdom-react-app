import { create } from "zustand";
import type { QuizScore, QuizCompletion } from "../../shared/src/types/quiz";
import apiClient from "../fetchers/axiosInstance";

export interface QuizCompletionStore {
  completion: QuizCompletion | null;
  isLoading: boolean;
  error: string | null;
  currentQuizId: string | null;

  setError: (error: string) => void;
  loadCompletion: (quizId: string) => Promise<void>;
  completeQuiz: (quizId: string, score: QuizScore) => Promise<void>;
  updateFeedback: (quizId: string, rating: number, comment?: string) => Promise<void>;
  reset: () => void;
}

const initialState = {
  completion: null as QuizCompletion | null,
  isLoading: false,
  error: null as string | null,
  currentQuizId: null as string | null,
};

export const useQuizCompletionStore = create<QuizCompletionStore>((set, get) => ({
  ...initialState,

  setError: (error: string) => set({ error, isLoading: false }),

  loadCompletion: async (quizId: string) => {
    set({ isLoading: true, error: null, currentQuizId: quizId });

    try {
      const response = await apiClient.get(`/getQuizCompletionStatus?quizId=${quizId}`);
      const { completion } = response.data;

      set({
        completion,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.error || "Failed to load completion status";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  completeQuiz: async (quizId: string, score: QuizScore) => {
    set({ isLoading: true, error: null });

    try {
      await apiClient.post("/completeQuiz", { quizId, score });

      // Reload completion after recording
      await get().loadCompletion(quizId);

      set({ isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.error || "Failed to complete quiz";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  updateFeedback: async (quizId: string, rating: number, comment?: string) => {
    set({ isLoading: true, error: null });

    try {
      await apiClient.patch("/updateQuizCompletionFeedback", {
        quizId,
        rating,
        comment,
      });

      // Reload completion to get updated feedback
      await get().loadCompletion(quizId);

      set({ isLoading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.error || "Failed to update feedback";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  reset: () => set(initialState),
}));
