import axios from "axios";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  documentId,
  addDoc,
} from "firebase/firestore";
import { UserQuiz } from "../../shared/src/types";

// TODO: Remove these old client-side Firestore functions
// They should be replaced with backend API calls using useQuizCompletionStore
interface QuizAttempt {
  id?: string;
  userId: string;
  quizId: string;
  attemptNumber: number;
  completed: boolean;
  score?: number;
  completedAt: Date | null;
  feedbackLeft: boolean;
}

interface Feedback {
  userId: string;
  userName: string;
  message: string;
  createdAt: Date;
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

//======================== NEWS  ==========================

export async function getMediaNews(category: string, keywords: string) {
  const url = `${NEWS_BASE_URL}?access_key=${API_KEY}&category=${category}&languages=en&keywords=${keywords}`;

  try {
    const { data } = await axios.get(url);
    return data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Response data:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}

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

//======================== TOGGLE FAVORITE QUIZ  ====================

export async function toggleFavorites(quizId: string, userId: string, action: string) {
  try {
    const ref = doc(db, "users", userId);
    switch (action) {
      case "add":
        await updateDoc(ref, {
          favorites: arrayUnion(quizId),
        });
        break;
      case "remove":
        await updateDoc(ref, {
          favorites: arrayRemove(quizId),
        });
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//======================== GET FAVORITE QUIZES  ====================

export async function getFavoriteQuizes(quizIds: string[], setError: (error: string) => void) {
  try {
    const q = query(collection(db, "quizes"), where(documentId(), "in", quizIds));
    const querySnapshot = await getDocs(q);
    const quizes = querySnapshot.docs.map((doc) => {
      return {
        ...(doc.data() as UserQuiz),
        id: doc.id,
        publishedAt: doc.data().publishedAt.toDate(),
      };
    });
    return quizes;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
      throw new Error(error.message);
    }
  }
}

//======================== QUIZ ATTEMPTS  ====================

export async function getUserQuizAttempts(userId: string, quizId: string): Promise<QuizAttempt[]> {
  try {
    const q = query(
      collection(db, "quizAttempts"),
      where("userId", "==", userId),
      where("quizId", "==", quizId)
    );
    const querySnapshot = await getDocs(q);
    const attempts = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as QuizAttempt),
      id: doc.id,
      completedAt: doc.data().completedAt?.toDate(),
    }));
    return attempts;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return [];
  }
}

export async function canAttemptQuiz(userId: string, quizId: string): Promise<boolean> {
  try {
    const attempts = await getUserQuizAttempts(userId, quizId);
    return attempts.length < 2;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return false;
  }
}

export async function addQuizAttempt(
  userId: string,
  quizId: string,
  completed: boolean,
  score?: number
): Promise<void> {
  try {
    const attempts = await getUserQuizAttempts(userId, quizId);
    const attemptNumber = attempts.length + 1;

    if (attemptNumber > 2) {
      throw new Error("Maximum attempts reached for this quiz");
    }

    await addDoc(collection(db, "quizAttempts"), {
      quizId,
      userId,
      attemptNumber,
      completed,
      score: score || 0,
      completedAt: completed ? new Date() : null,
      feedbackLeft: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function canLeaveFeedback(userId: string, quizId: string): Promise<boolean> {
  try {
    const attempts = await getUserQuizAttempts(userId, quizId);
    // User can leave feedback if they completed the quiz and haven't left feedback yet
    const completedAttempt = attempts.find((attempt) => attempt.completed && !attempt.feedbackLeft);
    return !!completedAttempt;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return false;
  }
}

//======================== FEEDBACK  ====================

export async function submitFeedback(
  userId: string,
  userName: string,
  quizId: string,
  message: string
): Promise<void> {
  try {
    // Check if user can leave feedback
    const canFeedback = await canLeaveFeedback(userId, quizId);
    if (!canFeedback) {
      throw new Error(
        "You must complete the quiz before leaving feedback, and can only leave feedback once"
      );
    }

    // Add feedback to quiz
    const quizRef = doc(db, "quizes", quizId);
    const newFeedback: Feedback = {
      userId,
      userName,
      message,
      createdAt: new Date(),
    };

    await updateDoc(quizRef, {
      feedbacks: arrayUnion(newFeedback),
    });

    // Mark feedback as left in quiz attempt
    const attempts = await getUserQuizAttempts(userId, quizId);
    const completedAttempt = attempts.find((attempt) => attempt.completed && !attempt.feedbackLeft);

    if (completedAttempt && completedAttempt.id) {
      const attemptRef = doc(db, "quizAttempts", completedAttempt.id);
      await updateDoc(attemptRef, {
        feedbackLeft: true,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
