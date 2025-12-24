import { db } from "../config/firestore";
import { COLLECTIONS } from "../utils/constants";
import { DecodedUser, UserDocument, UserProfile } from "../types/user";

/**
 * Sync user with database - creates new user or updates last login
 */
export const syncUserWithDatabase = async (decodedUser: DecodedUser): Promise<UserProfile> => {
  const userRef = db.collection(COLLECTIONS.USERS).doc(decodedUser.uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    // 1. CREATE Logic: If user doesn't exist, define and set the new record
    const newUser: UserDocument = {
      uid: decodedUser.uid,
      email: decodedUser.email || "",
      displayName: decodedUser.name || "Anonymous",
      photoURL: decodedUser.picture || "",
      dateOfBirth: null,
      location: "",
      sex: "neutral",
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
