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
  setCurrentUser: (user: CurrentUser | null) => void;
  signup: (values: UserData) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  signup: (values: UserData): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, values.email, values.password);
  },

  login: (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    set({ currentUser: null });
    return signOut(auth);
  },

  getUser: async () => {
    try {
      if (!auth.currentUser) {
        return;
      }
      const user = await getCurrentUser(auth.currentUser.uid);
      if (user && user.exists()) {
        const currentUser: CurrentUser = {
          ...(user.data() as CurrentUser),
          id: auth.currentUser!.uid,
          dateOfBirth: user.data().dateOfBirth.toDate(),
        };
        set({ currentUser });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
}));

// Initialize auth state listener
onAuthStateChanged(auth, () => {
  useAuthStore.getState().getUser();
});
