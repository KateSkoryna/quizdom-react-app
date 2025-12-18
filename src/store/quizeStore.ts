import { create } from "zustand";
import { Complexity, UserQuiz } from "../types";
import { QuizFormState } from "../types";
import { UseFormSetError } from "react-hook-form";
import { COMPLEXITY_VALUES } from "../const/complexity";
import { apiCall } from "../fetchers/common";
import dayjs from "dayjs";

interface QuizStore {
  quizes: UserQuiz[];
  userQuizes: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  getQuizes: () => Promise<void>;
  getQuizesById: (userId: string, status?: string) => Promise<void>;
  getQuizesByCategoryAndComplexity: (
    category: string | null,
    complexity: string | null
  ) => Promise<void>;
  addQuiz: (
    data: QuizFormState,
    userId: string,
    userName: string,
    setError: UseFormSetError<QuizFormState>
  ) => Promise<void>;
  updateQuiz: (quizId: string, data: Partial<QuizFormState>) => Promise<void>;
  removeQuiz: (quizId: string) => Promise<void>;
  clearQuizes: () => void;
}

export const useQuizesStore = create<QuizStore>((set, get) => ({
  quizes: [],
  userQuizes: [],
  isLoading: false,
  error: null,

  setError: (error: string) => set({ error, isLoading: false }),

  getQuizes: async () => {
    await apiCall(set, "get", "/getQuizes", undefined, (data: any[]) => {
      const quizes = data.map((quiz: any) => ({
        ...quiz,
        publishedAt: dayjs(quiz.publishedAt._seconds * 1000).toDate(),
      }));
      set({ quizes });
    });
  },

  getQuizesById: async (userId: string) => {
    const params: any = { userId };
    set({ isLoading: true, error: null });
    await apiCall(set, "get", "/getQuizesByUserId", { params }, (data: any[]) => {
      const quizes = data.map((quiz: any) => ({
        ...quiz,
        publishedAt: dayjs(quiz.publishedAt._seconds * 1000).toDate(),
      }));
      set({ userQuizes: quizes, isLoading: false, error: null });
    });
  },

  getQuizesByCategoryAndComplexity: async (category: string | null, complexity: string | null) => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (complexity) params.complexity = complexity;

    await apiCall(set, "get", "/getQuizes", { params }, (data: any[]) => {
      const quizes = data.map((quiz: any) => ({
        ...quiz,
        publishedAt: dayjs(quiz.publishedAt._seconds * 1000).toDate(),
      }));
      set({ quizes });
    });
  },

  addQuiz: async (
    data: QuizFormState,
    userId: string,
    userName: string,
    setFormError: UseFormSetError<QuizFormState>
  ) => {
    try {
      await apiCall(set, "post", "/createQuiz", { data }, (responseData: { quizId: string }) => {
        // Optimistically add to local state
        const newQuiz: UserQuiz = {
          id: responseData.quizId,
          ...data,
          authorId: userId,
          authorName: userName,
          publishedAt: new Date(),
          status: "done",
          complexity: COMPLEXITY_VALUES[data.complexity] as Complexity,
        };
        set({ quizes: [...get().quizes, newQuiz] });
      });
    } catch (error: any) {
      setFormError("root", { message: error.message });
      throw error;
    }
  },

  updateQuiz: async (quizId: string, data: Partial<QuizFormState>) => {
    await apiCall(set, "put", "/updateQuiz", { data, params: { quizId } }, () => {
      // Update local state
      const updatedQuizes = get().quizes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, ...data } : quiz
      );
      set({ quizes: updatedQuizes });
    });
  },

  removeQuiz: async (quizId: string) => {
    await apiCall(set, "delete", "/deleteQuiz", { params: { quizId } }, () => {
      // Remove from local state
      const updatedQuizes = get().quizes.filter((quiz) => quiz.id !== quizId);
      set({ quizes: updatedQuizes });
    });
  },

  clearQuizes: () => set({ quizes: [], isLoading: false, error: null }),
}));
