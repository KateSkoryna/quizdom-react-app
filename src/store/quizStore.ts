import { create } from "zustand";
import { UserQuiz } from "../types";
import { QuizFormState } from "../types";
import { UseFormSetError } from "react-hook-form";
import { apiCall } from "../fetchers/common";
import { Status } from "../components/modal/quizModal";

interface QuizStore {
  quizzes: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;

  // Fetch methods
  getQuizzes: (category?: string | null, complexity?: string | null) => Promise<void>;
  getQuizById: (quizId: string) => Promise<UserQuiz | null>;
  getQuizzesById: (userId: string, status?: string) => Promise<void>;

  // Mutation methods
  addQuiz: (
    data: QuizFormState & { status: Status },
    setError: UseFormSetError<QuizFormState>
  ) => Promise<void>;
  updateQuiz: (quizId: string, data: Partial<QuizFormState & { status: Status }>) => Promise<void>;
  removeQuiz: (quizId: string) => Promise<void>;
  clearQuizzes: () => void;

  // Selectors
  getPublishedQuizzes: (category?: string | null, complexity?: string | null) => UserQuiz[];
  getUserQuizzes: (userId: string, status?: Status) => UserQuiz[];
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: [],
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
        const fetchedQuizzes = data.map((quiz: any) => ({
          ...quiz,
          publishedAt: quiz.publishedAt?._seconds
            ? new Date(quiz.publishedAt._seconds * 1000)
            : new Date(),
        }));

        const existingQuizzes = get().quizzes;
        const quizMap = new Map(existingQuizzes.map((q) => [q.id, q]));
        fetchedQuizzes.forEach((quiz) => quizMap.set(quiz.id, quiz));

        set({ quizzes: Array.from(quizMap.values()), isLoading: false, error: null });
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
      const fetchedQuizzes = data.map((quiz: any) => ({
        ...quiz,
        publishedAt: quiz.publishedAt?._seconds
          ? new Date(quiz.publishedAt._seconds * 1000)
          : new Date(),
      }));

      const existingQuizzes = get().quizzes;
      const quizMap = new Map(existingQuizzes.map((q) => [q.id, q]));
      fetchedQuizzes.forEach((quiz) => quizMap.set(quiz.id, quiz));

      set({ quizzes: Array.from(quizMap.values()), isLoading: false, error: null });
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
          quizzes: [...state.quizzes, createdQuiz],
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
      set({ quizzes: updatedQuizzes });
    });
  },

  removeQuiz: async (quizId: string) => {
    await apiCall(set, "delete", "/deleteQuiz", { params: { quizId } }, () => {
      // Remove from quizzes array
      const updatedQuizzes = get().quizzes.filter((quiz) => quiz.id !== quizId);
      set({ quizzes: updatedQuizzes });
    });
  },

  clearQuizzes: () => set({ quizzes: [], isLoading: false, error: null }),

  // Selectors
  getPublishedQuizzes: (category?: string | null, complexity?: string | null) => {
    return get().quizzes.filter((quiz) => {
      if (quiz.status !== "done") return false;
      if (category && quiz.category !== category) return false;
      if (complexity && quiz.complexity !== complexity) return false;
      return true;
    });
  },

  getUserQuizzes: (userId: string, status?: Status) => {
    return get().quizzes.filter((quiz) => {
      if (quiz.authorId !== userId) return false;
      if (status && quiz.status !== status) return false;
      return true;
    });
  },
}));
