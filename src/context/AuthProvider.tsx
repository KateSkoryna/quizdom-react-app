import { AuthProviderProps, CurrentUser, UserData } from "../types/types";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "../API/api";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [, setError] = useState<string | null>(null);

  const signup = (values: UserData): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, values.email, values.password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
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
          setCurrentUser(currentUser);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
