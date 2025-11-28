import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { GENDER } from "../types/types";
import { avatar as defaultAvatar } from "./generateRandomAvatar";

type AuthType = "google" | "email";

interface EmailSignupData {
  name: string;
  email: string;
  dateOfBirth?: Date;
  gender?: GENDER;
}

export const ensureUserDocument = async (
  authType: AuthType,
  emailSignupData?: EmailSignupData
): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);

  // If document exists, no need to create
  if (userDoc.exists()) {
    return;
  }

  // Document doesn't exist - create it based on auth type
  if (authType === "google") {
    await setDoc(userRef, {
      name: auth.currentUser.displayName || "User",
      email: auth.currentUser.email,
      avatar: auth.currentUser.photoURL || defaultAvatar,
      dateOfBirth: Timestamp.now(),
      gender: GENDER.NEUTRAL,
      averageScore: 0,
      favorites: [],
      userInfo: "I'm a new user and I don't have a bio yet.",
    });
  } else if (authType === "email" && emailSignupData) {
    await setDoc(userRef, {
      name: emailSignupData.name,
      email: emailSignupData.email,
      avatar: defaultAvatar,
      dateOfBirth: emailSignupData.dateOfBirth
        ? Timestamp.fromDate(emailSignupData.dateOfBirth)
        : Timestamp.now(),
      gender: emailSignupData.gender || GENDER.NEUTRAL,
      averageScore: 0,
      favorites: [],
      userInfo: "I'm a new user and I don't have a bio yet.",
    });
  }
};
