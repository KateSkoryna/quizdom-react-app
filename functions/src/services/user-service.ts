import * as admin from "firebase-admin";
import { db } from "../config/firestore";
import { COLLECTIONS } from "../utils/constants";
import { DecodedUser, UserDocument, UserProfile, Gender } from "../types/user";

/**
 * Sync user with database - creates new user or updates last login
 */
export const syncUserWithDatabase = async (decodedUser: DecodedUser): Promise<UserProfile> => {
  const userRef = db.collection(COLLECTIONS.USERS).doc(decodedUser.uid);
  const userDoc = await userRef.get();

  // Fetch full user profile from Firebase Auth (includes displayName and photoURL)
  const authUser = await admin.auth().getUser(decodedUser.uid);

  if (!userDoc.exists) {
    // 1. CREATE Logic: If user doesn't exist, define and set the new record
    const photoURL = authUser.photoURL || decodedUser.picture || "";

    const newUser: UserDocument = {
      uid: decodedUser.uid,
      email: authUser.email || decodedUser.email || "",
      displayName: authUser.displayName || decodedUser.name || "Anonymous",
      photoURL: photoURL,
      dateOfBirth: null,
      location: "",
      sex: Gender.NEUTRAL,
      bio: "I'm a new user and dont have any bio yet",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    await userRef.set(newUser);
    return { id: userRef.id, ...newUser };
  }

  // 2. LOGIN Logic: If user exists, update last login and return existing data
  const existingData = userDoc.data() as UserDocument;
  const updateData = {
    lastLogin: new Date().toISOString(),
  };

  await userRef.update(updateData);

  return {
    id: userDoc.id,
    ...existingData,
    ...updateData,
  };
};
