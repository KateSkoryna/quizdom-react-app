import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// TODO: Migrate these remaining functions to backend API or appropriate stores/hooks

//======================== GET USER  ==========================

export async function getCurrentUser(userId: string) {
  try {
    const ref = doc(db, "users", userId);
    const user = await getDoc(ref);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//======================== EDIT USER  ====================

export async function editUser(
  userId: string,
  field: string,
  value: string | import("firebase/firestore").Timestamp
) {
  try {
    const ref = doc(db, "users", userId);
    await updateDoc(ref, {
      [field]: value,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

