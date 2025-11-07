import { create } from "zustand";
import { getAllQuizes, getQuizesById } from "../API/api";
import { UserQuiz } from "../types/types";

interface QuizStore {
  quizes: UserQuiz[];
  userQuizes: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  getQuizes: () => Promise<void>;
  getQuizesById: (userId: string) => Promise<void>;
  clearQuizes: () => void;
}

export const useQuizesStore = create<QuizStore>((set, get) => ({
  quizes: [],
  userQuizes: [],
  isLoading: false,
  error: null,
  setError: (error: string) => set({ error, isLoading: false, quizes: [] }),
  getQuizes: async () => {
    const setError = get().setError;
    set({ isLoading: true, error: null });

    const quizes = await getAllQuizes(setError);

    if (quizes) {
      set({ quizes, isLoading: false, error: null });
    }
  },
  getQuizesById: async (userId: string) => {
    const setError = get().setError;
    set({ isLoading: true, error: null });

    const userQuizes = await getQuizesById(userId, setError);
    if (userQuizes) {
      set({ userQuizes, isLoading: false, error: null });
    }
  },
  clearQuizes: () => set({ quizes: [], isLoading: false, error: null }),
}));
