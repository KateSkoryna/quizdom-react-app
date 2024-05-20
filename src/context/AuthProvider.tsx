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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (values: UserData): Promise<UserCredential> => {
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
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        const user: CurrentUser = {
          name: data.displayName || "",
          email: data.email || "",
          avatar: data.photoURL || "",
        };
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
