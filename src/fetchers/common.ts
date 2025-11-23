import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../store/AuthStore";
import { CurrentUser } from "../types/types";
import { getCurrentUser } from "./api";

export const fetchUserWithToken = async (
  firebaseUser: User | null,
  setCurrentUser: (user: CurrentUser | null) => void
): Promise<void> => {
  if (firebaseUser) {
    // User is signed in - get token and load user data
    const token = await firebaseUser.getIdToken();

    // Save auth data to localStorage
    const authData = {
      isLoggedIn: true,
      token,
      email: firebaseUser.email,
      uid: firebaseUser.uid,
    };
    localStorage.setItem("authData", JSON.stringify(authData));

    // Load user data from Firestore
    const user = await getCurrentUser(firebaseUser.uid);

    if (user && user.exists()) {
      const userData = user.data();

      // Handle Firestore Timestamp or string date
      let dateOfBirth: Date;
      if (userData.dateOfBirth?.toDate) {
        // Firestore Timestamp
        dateOfBirth = userData.dateOfBirth.toDate();
      } else if (userData.dateOfBirth) {
        // String or other format
        dateOfBirth = new Date(userData.dateOfBirth);
      } else {
        dateOfBirth = new Date();
      }

      const currentUser: CurrentUser = {
        ...(userData as CurrentUser),
        id: firebaseUser.uid,
        dateOfBirth,
      };
      setCurrentUser(currentUser);
    } else {
      // User document doesn't exist in Firestore - sign out
      console.warn(
        "User document not found in Firestore for uid:",
        firebaseUser.uid
      );
      await signOut(auth);
      localStorage.removeItem("authData");
      setCurrentUser(null);
    }
  } else {
    // User is signed out
    localStorage.removeItem("authData");
    setCurrentUser(null);
  }

  // Set loading to false after auth check
  useAuthStore.setState({ isAuthLoading: false });
};
