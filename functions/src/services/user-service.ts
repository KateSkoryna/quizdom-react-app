import * as admin from "firebase-admin";
import { db } from "../config/firestore";
import { COLLECTIONS } from "../utils/constants";
import { DecodedUser, UserDocument, UserProfile, Gender } from "../types/user";

/**
 * Generate a unique avatar URL for a user using DiceBear API
 */
const generateAvatarUrl = (userId: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
};

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
    // Priority: Google/OAuth photo > Generated avatar
    const photoURL = authUser.photoURL || decodedUser.picture || generateAvatarUrl(decodedUser.uid);

    const newUser: UserDocument = {
      uid: decodedUser.uid,
      email: authUser.email || decodedUser.email || "",
      displayName: authUser.displayName || decodedUser.name || "Anonymous",
      photoURL: photoURL,
      dateOfBirth: null,
      location: "",
      sex: Gender.NEUTRAL,
      bio: "I'm a new user and dont have any bio yet",
      averageScore: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    await userRef.set(newUser);
    return { id: userRef.id, ...newUser };
  }

  // 2. LOGIN Logic: If user exists, update last login and sync photoURL
  const existingData = userDoc.data() as UserDocument;

  // Sync photoURL from Firebase Auth (in case Google photo was updated)
  // But preserve user-uploaded photos (those stored in Firebase Storage)
  const currentPhotoURL = existingData.photoURL || "";
  const isUserUploadedPhoto = currentPhotoURL.includes("firebasestorage.googleapis.com");
  const isGeneratedAvatar = currentPhotoURL.includes("dicebear.com");

  // Only update photoURL if:
  // 1. User has a new Google/OAuth photo, OR
  // 2. User has no photo and we should generate one
  let updatedPhotoURL = currentPhotoURL;
  if (!isUserUploadedPhoto) {
    if (authUser.photoURL || decodedUser.picture) {
      // Sync from Google/OAuth
      updatedPhotoURL = authUser.photoURL || decodedUser.picture || currentPhotoURL;
    } else if (!currentPhotoURL || isGeneratedAvatar) {
      // Generate avatar if missing or already using generated avatar
      updatedPhotoURL = generateAvatarUrl(decodedUser.uid);
    }
  }

  const updateData = {
    lastLogin: new Date().toISOString(),
    ...(updatedPhotoURL !== currentPhotoURL && { photoURL: updatedPhotoURL }),
  };

  await userRef.update(updateData);

  return {
    id: userDoc.id,
    ...existingData,
    ...updateData,
  };
};
