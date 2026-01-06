import { create } from "zustand";

export enum ErrorSeverity {
  WARNING = "warning",
  ERROR = "error",
}

export interface AppError {
  id: string;
  userMessage: string;
  severity: ErrorSeverity;
  dismissable: boolean;
}

interface GlobalErrorStore {
  errors: AppError[];

  addError: (error: Omit<AppError, "id">) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

export const useGlobalErrorStore = create<GlobalErrorStore>((set, get) => ({
  errors: [],

  addError: (error) => {
    const appError: AppError = {
      ...error,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    };

    set((state) => ({
      errors: [...state.errors, appError],
    }));

    // Auto-dismiss after 7 seconds
    setTimeout(() => {
      get().removeError(appError.id);
    }, 7000);
  },

  removeError: (id) => {
    set((state) => ({
      errors: state.errors.filter((e) => e.id !== id),
    }));
  },

  clearErrors: () => set({ errors: [] }),
}));
