import { create } from "zustand";
import { Complexity, QuizCategory, QuizFormState } from "../types/types";

type ActiveNavStore = {
  active: string;
  setActive: (active: string) => void;
};

const defaultValues: QuizFormState = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      questionTitle: "",
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
      ],
    },
  ],
};

type OpenQuizModal = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type SetQuizForm = {
  newQuizData: QuizFormState;
  setNewQuizData: (newQuizData: QuizFormState) => void;
};

export const useActiveNavStore = create<ActiveNavStore>((set) => ({
  active: "quizes",
  setActive: (active) => set({ active }),
}));

export const useSetQuizForm = create<SetQuizForm>((set) => ({
  newQuizData: defaultValues,
  setNewQuizData: (newQuizData) => set({ newQuizData }),
}));

export const useOpenQuizModal = create<OpenQuizModal>((set) => ({
  show: false,
  setShow: (show) => set({ show }),
}));

export const useOpenOffCanvas = create<OpenQuizModal>((set) => ({
  show: false,
  setShow: (show) => set({ show }),
}));
