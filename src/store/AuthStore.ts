import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { getCurrentUser } from "../API/api";
import { CurrentUser, UserData } from "../types/types";

interface AuthStore {
  currentUser: CurrentUser | null;
  isAuthLoading: boolean;
  setCurrentUser: (user: CurrentUser | null) => void;
  signup: (values: UserData) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthLoading: true,

  setCurrentUser: (user) => set({ currentUser: user }),

  signup: (values: UserData): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, values.email, values.password);
  },

  login: (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    } finally {
      set({ currentUser: null });
    }
  },

  getUser: async () => {
    try {
      if (!auth.currentUser) {
        set({ isAuthLoading: false });
        return;
      }
      const user = await getCurrentUser(auth.currentUser.uid);
      if (user && user.exists()) {
        const currentUser: CurrentUser = {
          ...(user.data() as CurrentUser),
          id: auth.currentUser!.uid,
          dateOfBirth: user.data().dateOfBirth.toDate(),
        };
        set({ currentUser, isAuthLoading: false });
      } else {
        set({ isAuthLoading: false });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      set({ isAuthLoading: false });
    }
  },
}));

// Initialize auth state listener
onAuthStateChanged(auth, () => {
  useAuthStore.getState().getUser();
});
