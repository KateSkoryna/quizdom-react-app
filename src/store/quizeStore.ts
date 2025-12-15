import { create } from "zustand";
import { UserQuiz } from "../../shared/src/types";
import { db } from "../firebase";
import { doc, deleteDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { QuizFormState } from "../../shared/src/types";
import { UseFormSetError } from "react-hook-form";
import { COMPLEXITY_VALUES } from "../const/complexity";

interface QuizStore {
  quizes: UserQuiz[];
  userQuizes: UserQuiz[];
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  getQuizes: () => Promise<void>;
  getQuizesById: (userId: string) => Promise<void>;
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
  removeQuiz: (quizId: string) => Promise<void>;
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
    try {
      const snapshot = await getDocs(collection(db, "quizes"));
      const quizes = snapshot.docs.map((doc) => {
        return {
          ...(doc.data() as UserQuiz),
          id: doc.id,
          publishedAt: doc.data().publishedAt.toDate(),
        };
      });

      set({ quizes, isLoading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw new Error(error.message);
      }
    }
  },
  getQuizesById: async (userId: string) => {
    const setError = get().setError;
    set({ isLoading: true, error: null });

    try {
      const q = query(collection(db, "quizes"), where("authorId", "==", userId));
      const querySnapshot = await getDocs(q);

      const quizes = querySnapshot.docs.map((doc) => {
        return {
          ...(doc.data() as UserQuiz),
          id: doc.id,
          publishedAt: doc.data().publishedAt.toDate(),
        };
      });

      set({ userQuizes: quizes, isLoading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        throw new Error(error.message);
      }
    }
  },
  getQuizesByCategoryAndComplexity: async (category: string | null, complexity: string | null) => {
    set({ isLoading: true, error: null });

    try {
      let q = query(collection(db, "quizes"), where("category", "==", category));
      if (!category || complexity) {
        q = query(collection(db, "quizes"), where("complexity", "==", complexity));
      }
      if (category && complexity) {
        q = query(
          collection(db, "quizes"),
          where("category", "==", category),
          where("complexity", "==", complexity)
        );
      }

      const querySnapshot = await getDocs(q);
      const quizes = querySnapshot.docs.map((doc) => {
        return {
          ...(doc.data() as UserQuiz),
          id: doc.id,
          publishedAt: doc.data().publishedAt.toDate(),
        };
      });
      set({ quizes, isLoading: false, error: null });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  addQuiz: async (
    data: QuizFormState,
    userId: string,
    userName: string,
    setError: UseFormSetError<QuizFormState>
  ) => {
    try {
      set({ isLoading: true, error: null });
      await addDoc(collection(db, "quizes"), {
        ...data,
        authorId: userId,
        authorName: userName,
        publishedAt: new Date(),
        complexity: COMPLEXITY_VALUES[data.complexity],
      });
      set({ isLoading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          message: "Failed to create a quiz",
        });
        throw new Error(error.message);
      }
    }
  },
  removeQuiz: async (quizId: string) => {
    try {
      set({ isLoading: true, error: null });
      await deleteDoc(doc(db, "quizes", quizId));
      set({ isLoading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  clearQuizes: () => set({ quizes: [], isLoading: false, error: null }),
}));
