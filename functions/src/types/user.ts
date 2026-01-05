/**
 * Gender enum matching frontend GENDER enum
 */
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  NEUTRAL = "neutral",
}

/**
 * Decoded Firebase Auth token from verifyAuthToken
 */
export interface DecodedUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

/**
 * User document stored in Firestore
 */
export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  dateOfBirth: string | null;
  location: string;
  sex: Gender;
  bio: string;
  createdAt: string;
  lastLogin: string;
}

/**
 * User profile returned from API (includes document ID)
 */
export interface UserProfile extends UserDocument {
  id: string;
}
