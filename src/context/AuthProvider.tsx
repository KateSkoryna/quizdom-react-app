import { AuthProviderProps, CurrentUser, UserData } from "../types/types";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { Loader } from "../components/Loader/Loader";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

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
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }
      const ref = doc(db, "users", auth.currentUser!.uid);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const userData = snapshot.data() as CurrentUser;

        const user: CurrentUser = {
          ...userData,
          id: auth.currentUser!.uid,
          dateOfBirth: snapshot.data().dateOfBirth.toDate(),
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
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};