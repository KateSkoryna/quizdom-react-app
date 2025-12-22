import { create } from "zustand";
import { UserQuiz } from "../types";
import { QuizFormState } from "../types";
import { UseFormSetError } from "react-hook-form";
import { apiCall } from "../fetchers/common";
import { Status } from "../components/modal/quizModal";

interface QuizStore {
  quizzes: UserQuiz[];
  userQuizzes: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  getQuizzes: (category?: string | null, complexity?: string | null) => Promise<void>;
  getQuizById: (quizId: string) => Promise<UserQuiz | null>;
  getQuizzesById: (userId: string, status?: string) => Promise<void>;
  addQuiz: (
    data: QuizFormState & { status: Status },
    setError: UseFormSetError<QuizFormState>
  ) => Promise<void>;
  updateQuiz: (
    quizId: string,
    data: Partial<QuizFormState & { status: Status }>
  ) => Promise<void>;
  removeQuiz: (quizId: string) => Promise<void>;
  clearQuizzes: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: [],
  userQuizzes: [],
  isLoading: false,
  error: null,

  setError: (error: string) => set({ error, isLoading: false }),

  getQuizzes: async (category?: string | null, complexity?: string | null) => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (complexity) params.complexity = complexity;

    await apiCall(
      set,
      "get",
      "/getQuizzes",
      Object.keys(params).length > 0 ? { params } : undefined,
      (data: any[]) => {
        const quizzes = data.map((quiz: any) => ({
          ...quiz,
          publishedAt: quiz.publishedAt?._seconds
            ? new Date(quiz.publishedAt._seconds * 1000)
            : new Date(),
        }));
        set({ quizzes, isLoading: false, error: null });
      }
    );
  },

  getQuizById: async (quizId: string): Promise<UserQuiz | null> => {
    try {
      let quiz: UserQuiz | null = null;
      await apiCall(set, "get", "/getQuizById", { params: { quizId } }, (data: any) => {
        quiz = {
          ...data,
          publishedAt: data.publishedAt?._seconds
            ? new Date(data.publishedAt._seconds * 1000)
            : new Date(),
        };
      });
      return quiz;
    } catch (error) {
      console.error(`Failed to fetch quiz ${quizId}:`, error);
      return null;
    }
  },

  getQuizzesById: async (userId: string) => {
    const params: any = { userId };
    set({ isLoading: true, error: null });
    await apiCall(set, "get", "/getQuizzesByUserId", { params }, (data: any[]) => {
      const quizzes = data.map((quiz: any) => ({
        ...quiz,
        publishedAt: quiz.publishedAt?._seconds
          ? new Date(quiz.publishedAt._seconds * 1000)
          : new Date(),
      }));
      set({ userQuizzes: quizzes, isLoading: false, error: null });
    });
  },

  addQuiz: async (
    data: QuizFormState & { status: Status },
    setFormError: UseFormSetError<QuizFormState>
  ) => {
    try {
      await apiCall(set, "post", "/createQuiz", { data }, (responseData: any) => {
        const createdQuiz: UserQuiz = responseData;

        set((state) => ({
          userQuizzes: [...state.userQuizzes, createdQuiz],
        }));
      });
    } catch (error: any) {
      setFormError("root", { message: error.message });
      throw error;
    }
  },

  updateQuiz: async (quizId: string, data: Partial<QuizFormState & { status: Status }>) => {
    await apiCall(set, "put", "/updateQuiz", { data, params: { quizId } }, () => {
      // Update local state
      const updatedQuizzes = get().quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, ...data } : quiz
      );
      const updatedUserQuizzes = get().userQuizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, ...data } : quiz
      );
      set({ quizzes: updatedQuizzes, userQuizzes: updatedUserQuizzes });
    });
  },

  removeQuiz: async (quizId: string) => {
    await apiCall(set, "delete", "/deleteQuiz", { params: { quizId } }, () => {
      // Remove from local state
      const updatedQuizzes = get().quizzes.filter((quiz) => quiz.id !== quizId);
      set({ quizzes: updatedQuizzes });
    });
  },

  clearQuizzes: () => set({ quizzes: [], isLoading: false, error: null }),
}));
