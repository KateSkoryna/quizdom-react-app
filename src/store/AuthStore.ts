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
import { CurrentUser, UserData } from "../../shared/types";

interface AuthStore {
  currentUser: CurrentUser | null;
  isAuthLoading: boolean;
  setCurrentUser: (user: CurrentUser | null) => void;
  signup: (values: UserData) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthLoading: true,

  setCurrentUser: (user) => set({ currentUser: user }),

  signup: async (values: UserData): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    return userCredential;
  },

  login: async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  },
  loginWithGoogle: async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  },
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authData");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      set({ currentUser: null, isAuthLoading: false });
    }
  },

  resetPassword: (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  },
}));
