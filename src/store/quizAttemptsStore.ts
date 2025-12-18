import { create } from "zustand";
import type { QuizScore, QuizCompletion } from "../types/quiz";
import { apiCall } from "../fetchers/common";

export interface QuizCompletionStore {
  completion: QuizCompletion | null;
  isLoading: boolean;
  error: string | null;
  currentQuizId: string | null;
  completionCache: Record<string, QuizCompletion | null>;

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
  completionCache: {} as Record<string, QuizCompletion | null>,
};

export const useQuizCompletionStore = create<QuizCompletionStore>((set, get) => ({
  ...initialState,

  setError: (error: string) => set({ error, isLoading: false }),

  loadCompletion: async (quizId: string) => {
    const { completionCache } = get();

    // Check cache first
    if (quizId in completionCache) {
      set({
        completion: completionCache[quizId],
        currentQuizId: quizId,
        isLoading: false,
        error: null,
      });
      return;
    }

    await apiCall(
      set,
      "get",
      `/getQuizCompletionStatus?quizId=${quizId}`,
      undefined,
      (data: { completion: QuizCompletion }) => {
        set((state) => ({
          currentQuizId: quizId,
          completion: data.completion,
          completionCache: {
            ...state.completionCache,
            [quizId]: data.completion,
          },
        }));
      }
    );
  },

  completeQuiz: async (quizId: string, score: QuizScore) => {
    await apiCall(set, "post", "/completeQuiz", { data: { quizId, score } }, () => {
      // Invalidate cache
      set((state) => ({
        completionCache: {
          ...state.completionCache,
          [quizId]: undefined as any,
        },
      }));
    });

    // Note: This causes double loading (submit + reload)
    // Could optimize by returning completion data from API
    await get().loadCompletion(quizId);
  },

  updateFeedback: async (quizId: string, rating: number, comment?: string) => {
    await apiCall(
      set,
      "patch",
      "/updateQuizCompletionFeedback",
      { data: { quizId, rating, comment } },
      () => {
        // Invalidate cache
        set((state) => ({
          completionCache: {
            ...state.completionCache,
            [quizId]: undefined as any,
          },
        }));
      }
    );

    // Note: This causes double loading (update + reload)
    // Could optimize by returning completion data from API
    await get().loadCompletion(quizId);
  },

  reset: () => set(initialState),
}));
