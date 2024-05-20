import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  CurrentUser,
  UserData,
  AuthContextValue,
  AuthProviderProps,
} from "../types/types";

export const AuthContext = createContext<AuthContextValue | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValue;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (values: UserData): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, values.email, values.password);
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        const user: CurrentUser = {
          name: data.displayName || "",
          email: data.email || "",
          avatar: data.photoURL || "",
        };
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
