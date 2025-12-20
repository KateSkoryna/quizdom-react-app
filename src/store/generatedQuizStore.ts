import { create } from "zustand";
import { apiCall } from "../fetchers/common";
import { QuizCategory, Complexity } from "../types";

interface GeneratedQuizQuestion {
  questionTitle: string;
  hint: string;
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
}

interface GeneratedQuiz {
  title: string;
  description: string;
  questions: GeneratedQuizQuestion[];
}

interface GenerateQuizParams {
  category: QuizCategory;
  complexity: Complexity;
  language?: string;
  customUserPrompt?: string;
}

interface GeneratedQuizStore {
  generatedQuiz: GeneratedQuiz | null;
  isGenerating: boolean;
  error: string | null;
  remainingAttempts: number;
  maxAttempts: number;
  generateQuiz: (params: GenerateQuizParams) => Promise<void>;
  resetAttempts: () => void;
  clearGeneratedQuiz: () => void;
}

export const useGeneratedQuizStore = create<GeneratedQuizStore>((set, get) => ({
  generatedQuiz: null,
  isGenerating: false,
  error: null,
  remainingAttempts: 5,
  maxAttempts: 5,

  generateQuiz: async (params: GenerateQuizParams) => {
    const { remainingAttempts } = get();

    if (remainingAttempts <= 0) {
      set({ error: "Maximum generation attempts reached. Please reload the page." });
      return;
    }

    set({ isGenerating: true, error: null });

    try {
      await apiCall(
        set,
        "post",
        "/generateQuiz",
        {
          data: {
            category: params.category,
            complexity: params.complexity,
            language: params.language || "English",
            customUserPrompt: params.customUserPrompt,
          },
        },
        (data: { quiz: GeneratedQuiz }) => {
          set({
            generatedQuiz: data.quiz,
            isGenerating: false,
            remainingAttempts: remainingAttempts - 1,
          });
        }
      );
    } catch (error: any) {
      set({
        isGenerating: false,
        error: error.message || "Failed to generate quiz",
      });
    }
  },

  resetAttempts: () => set({ remainingAttempts: get().maxAttempts }),

  clearGeneratedQuiz: () => set({ generatedQuiz: null, error: null }),
}));
