import { doc, setDoc, Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../firebase";
import { GENDER } from "../../shared/types";
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
  user: User,
  emailSignupData?: EmailSignupData
): Promise<void> => {
  if (!user) {
    throw new Error("No authenticated user found");
  }

  try {
    const userRef = doc(db, "users", user.uid);

    // Document doesn't exist - create it based on auth type
    const userData =
      authType === "google"
        ? {
            name: user.displayName || "User",
            email: user.email,
            avatar: user.photoURL || defaultAvatar,
            dateOfBirth: Timestamp.now(),
            gender: GENDER.NEUTRAL,
            averageScore: 0,
            favorites: [],
            userInfo: "I'm a new user and I don't have a bio yet.",
          }
        : authType === "email" && emailSignupData
        ? {
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
          }
        : null;

    if (!userData) {
      throw new Error("Invalid auth type or missing signup data");
    }

    // Create or update user document
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    throw new Error("Failed to create user profile");
  }
};
