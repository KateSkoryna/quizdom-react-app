import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { CurrentUser, UserData } from "../types";
import { useGlobalErrorStore, ErrorSeverity } from "./globalErrorStore";

export interface AuthStore {
  currentUser: CurrentUser | null;
  isAuthLoading: boolean;
  authError: string | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  signup: (values: UserData) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearAuthError: () => void;
}

// Firebase error code to user message mapping
const getAuthErrorMessage = (code: string): string => {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/operation-not-allowed": "This sign-in method is not enabled. Contact support.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/user-disabled": "This account has been disabled. Contact support.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Try again or reset your password.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/too-many-requests": "Too many failed attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "auth/popup-closed-by-user": "Sign-in was cancelled. Please try again.",
  };
  return errorMessages[code] || "Authentication failed. Please try again.";
};

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthLoading: true,
  authError: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  clearAuthError: () => set({ authError: null }),

  signup: async (values: UserData): Promise<UserCredential> => {
    set({ authError: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      useGlobalErrorStore.getState().clearErrors();
      return userCredential;
    } catch (error: any) {
      const userMessage = getAuthErrorMessage(error.code);
      set({ authError: userMessage });

      useGlobalErrorStore.getState().addError({
        userMessage,
        severity: ErrorSeverity.ERROR,
        dismissable: true,
      });
      throw error;
    }
  },

  login: async (email: string, password: string): Promise<UserCredential> => {
    set({ authError: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      useGlobalErrorStore.getState().clearErrors();
      return userCredential;
    } catch (error: any) {
      const userMessage = getAuthErrorMessage(error.code);
      set({ authError: userMessage });

      useGlobalErrorStore.getState().addError({
        userMessage,
        severity: ErrorSeverity.ERROR,
        dismissable: true,
      });
      throw error;
    }
  },

  loginWithGoogle: async (): Promise<UserCredential> => {
    set({ authError: null });
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const userCredential = await signInWithPopup(auth, provider);
      useGlobalErrorStore.getState().clearErrors();
      return userCredential;
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        return Promise.reject(error);
      }

      const userMessage = getAuthErrorMessage(error.code);
      set({ authError: userMessage });

      useGlobalErrorStore.getState().addError({
        userMessage,
        severity: ErrorSeverity.ERROR,
        dismissable: true,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authData");
      useGlobalErrorStore.getState().clearErrors();
      set({ currentUser: null, isAuthLoading: false, authError: null });
    } catch (error: any) {
      const userMessage = "Failed to sign out. Please try again.";
      set({ authError: userMessage });

      useGlobalErrorStore.getState().addError({
        userMessage,
        severity: ErrorSeverity.WARNING,
        dismissable: true,
      });
      throw error;
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    set({ authError: null });
    try {
      await sendPasswordResetEmail(auth, email);
      useGlobalErrorStore.getState().clearErrors();
    } catch (error: any) {
      const userMessage = getAuthErrorMessage(error.code);
      set({ authError: userMessage });

      useGlobalErrorStore.getState().addError({
        userMessage,
        severity: ErrorSeverity.ERROR,
        dismissable: true,
      });
      throw error;
    }
  },
}));
