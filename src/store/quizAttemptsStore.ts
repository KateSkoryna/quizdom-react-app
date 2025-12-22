import { create } from "zustand";
import type { QuizScore, QuizCompletion } from "../types/quiz";
import { apiCall } from "../fetchers/common";

export interface QuizCompletionStore {
  completion: QuizCompletion | null;
  isLoading: boolean;
  error: string | null;
  currentQuizId: string | null;
  completionCache: Record<string, QuizCompletion | null>;
  allCompletionsLoaded: boolean;

  setError: (error: string) => void;
  loadCompletion: (quizId: string) => Promise<void>;
  loadAllCompletions: () => Promise<void>;
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
  allCompletionsLoaded: false,
};

export const useQuizCompletionStore = create<QuizCompletionStore>((set, get) => ({
  ...initialState,

  setError: (error: string) => set({ error, isLoading: false }),

  loadCompletion: async (quizId: string) => {
    const { completionCache } = get();

    // Check cache first - only use if value is defined (not undefined)
    if (quizId in completionCache && completionCache[quizId] !== undefined) {
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
      (data: { completion: any }) => {
        const convertedCompletion = data.completion
          ? {
              ...data.completion,
              completedAt: data.completion.completedAt?._seconds
                ? new Date(data.completion.completedAt._seconds * 1000)
                : new Date(),
              feedbackUpdatedAt: data.completion.feedbackUpdatedAt?._seconds
                ? new Date(data.completion.feedbackUpdatedAt._seconds * 1000)
                : undefined,
            }
          : null;
        set((state) => ({
          currentQuizId: quizId,
          completion: convertedCompletion,
          completionCache: {
            ...state.completionCache,
            [quizId]: convertedCompletion,
          },
        }));
      }
    );
  },

  loadAllCompletions: async () => {
    const { allCompletionsLoaded } = get();

    // Only load once
    if (allCompletionsLoaded) {
      return;
    }

    await apiCall(
      set,
      "get",
      "/getAllUserCompletions",
      undefined,
      (data: { completions: any[] }) => {
        const cache: Record<string, any | null> = {};
        data.completions.forEach((completion) => {
          cache[completion.quizId] = {
            ...completion,
            completedAt: completion.completedAt?._seconds
              ? new Date(completion.completedAt._seconds * 1000)
              : new Date(),
            feedbackUpdatedAt: completion.feedbackUpdatedAt?._seconds
              ? new Date(completion.feedbackUpdatedAt._seconds * 1000)
              : undefined,
          };
        });
        set({
          completionCache: cache,
          allCompletionsLoaded: true,
        });
      }
    );
  },

  completeQuiz: async (quizId: string, score: QuizScore) => {
    await apiCall(set, "post", "/completeQuiz", { data: { quizId, score } }, () => {
      // Remove from cache to force reload
      set((state) => {
        const newCache = { ...state.completionCache };
        delete newCache[quizId];
        return {
          completionCache: newCache,
          allCompletionsLoaded: false,
        };
      });
    });

    // Reload the completion to get fresh data with timestamp
    await get().loadCompletion(quizId);
  },

  updateFeedback: async (quizId: string, rating: number, comment?: string) => {
    await apiCall(
      set,
      "patch",
      "/updateQuizCompletionFeedback",
      { data: { quizId, rating, comment } },
      () => {
        // Remove from cache to force reload
        set((state) => {
          const newCache = { ...state.completionCache };
          delete newCache[quizId];
          return {
            completionCache: newCache,
            allCompletionsLoaded: false,
          };
        });
      }
    );

    // Reload the completion to get fresh data with updated feedback
    await get().loadCompletion(quizId);
  },

  reset: () => set(initialState),
}));
