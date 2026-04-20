import { db } from "../config/firestore";
import {
  FieldValue,
  FieldPath,
  Timestamp,
  Query,
  Transaction,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase-admin/firestore";
import { COLLECTIONS, ACTION } from "../utils/constants";
import type { QuizCompletion, UserQuiz, QuizFormState } from "../types/quiz";

export const getQuizCompletion = async (
  userId: string,
  quizId: string
): Promise<QuizCompletion | null> => {
  const completionSnapshot = await db
    .collection(COLLECTIONS.QUIZ_COMPLETIONS)
    .where("quizId", "==", quizId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (completionSnapshot.empty) {
    return null;
  }

  const doc = completionSnapshot.docs[0];
  return doc.data() as QuizCompletion;
};

export const getUserCompletions = async (userId: string): Promise<QuizCompletion[]> => {
  const completionSnapshot = await db
    .collection(COLLECTIONS.QUIZ_COMPLETIONS)
    .where("userId", "==", userId)
    .get();

  return completionSnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as QuizCompletion);
};

export const createQuizCompletion = async (
  userId: string,
  quizId: string,
  score: { totalQuestions: number; correctAnswers: number }
): Promise<void> => {
  return await db.runTransaction(async (transaction: Transaction) => {
    const completionRef = db
      .collection(COLLECTIONS.QUIZ_COMPLETIONS)
      .where("quizId", "==", quizId)
      .where("userId", "==", userId);

    const completionSnapshot = await transaction.get(completionRef);

    if (!completionSnapshot.empty) {
      throw new Error("ALREADY_COMPLETED");
    }

    const newCompletionRef = db.collection(COLLECTIONS.QUIZ_COMPLETIONS).doc();
    const completionData = {
      quizId,
      userId,
      score,
      completedAt: FieldValue.serverTimestamp(),
    };

    transaction.set(newCompletionRef, completionData);
  });
};

export const updateQuizFeedback = async (
  userId: string,
  quizId: string,
  rating?: number,
  comment?: string
): Promise<void> => {
  const completionSnapshot = await db
    .collection(COLLECTIONS.QUIZ_COMPLETIONS)
    .where("quizId", "==", quizId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (completionSnapshot.empty) {
    throw new Error("COMPLETION_NOT_FOUND");
  }

  const completionRef = completionSnapshot.docs[0].ref;
  const updateData: Record<string, unknown> = {
    feedbackUpdatedAt: FieldValue.serverTimestamp(),
  };

  if (rating !== undefined && rating !== null) {
    updateData.rating = rating;
  }

  if (comment !== undefined && comment !== null) {
    updateData.comment = comment.trim();
  }

  await completionRef.update(updateData);

  // Update quiz average rating if rating was provided
  if (rating !== undefined && rating !== null) {
    await updateQuizRating(quizId);
  }
};

/**
 * Updates the average rating for a quiz based on all completion ratings
 */
async function updateQuizRating(quizId: string): Promise<void> {
  const completionsSnapshot = await db
    .collection(COLLECTIONS.QUIZ_COMPLETIONS)
    .where("quizId", "==", quizId)
    .get();

  const ratings = completionsSnapshot.docs
    .map((doc: QueryDocumentSnapshot) => doc.data().rating)
    .filter((rating: unknown): rating is number => rating !== undefined && rating !== null);

  if (ratings.length === 0) {
    return;
  }

  const averageRating =
    ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length;

  await db
    .collection(COLLECTIONS.QUIZZES)
    .doc(quizId)
    .update({
      rating: Math.round(averageRating * 10) / 10,
      ratingsCount: ratings.length,
    });
}

// ============================================================================
// Quiz CRUD Operations
// ============================================================================

interface QuizFilters {
  category?: string;
  complexity?: string;
  limit?: number;
  offset?: number;
}

/**
 * Get all published quizzes with optional filtering and pagination
 * Only returns quizzes with status = "done"
 */
export const getQuizzes = async (filters: QuizFilters = {}): Promise<UserQuiz[]> => {
  const { category, complexity, limit = 100, offset = 0 } = filters;

  try {
    let query: Query = db.collection(COLLECTIONS.QUIZZES);

    query = query.where("status", "==", "done");

    if (category) {
      query = query.where("category", "==", category);
    }

    if (complexity) {
      query = query.where("complexity", "==", complexity);
    }

    // Firestore requires 'orderBy' for offset, use 'publishedAt' field
    query = query.orderBy("publishedAt", "desc");

    if (offset > 0) {
      query = query.offset(offset);
    }

    query = query.limit(limit);

    const snapshot = await query.get();

    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserQuiz[];
  } catch (error) {
    void error;
    return [];
  }
};
/**
 * Get a single quiz by ID
 */
export const getQuizById = async (quizId: string): Promise<UserQuiz | null> => {
  const doc = await db.collection(COLLECTIONS.QUIZZES).doc(quizId).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  } as UserQuiz;
};

/**
 * Get all quizzes by a specific user/author
 * Optionally filter by status
 * Supports pagination with limit and offset
 */
export const getQuizzesByUserId = async (
  userId: string,
  status?: string,
  limit: number = 100,
  offset: number = 0
): Promise<{ quizzes: UserQuiz[]; total: number }> => {
  let query: Query = db.collection(COLLECTIONS.QUIZZES).where("authorId", "==", userId);

  if (status) {
    query = query.where("status", "==", status);
  }

  const snapshot = await query.get();

  // Get total count
  const total = snapshot.docs.length;

  // Sort in memory instead of using orderBy to avoid requiring Firestore index
  const allQuizzes = snapshot.docs.map(
    (doc: QueryDocumentSnapshot) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as UserQuiz
  );

  // Apply pagination
  const quizzes = allQuizzes.slice(offset, offset + limit);

  return { quizzes, total };
};

/**
 * Create a new quiz
 */
export const createQuiz = async (
  quizData: Omit<QuizFormState, "complexity" | "category"> & {
    complexity: string;
    category: string;
    status?: string;
  },
  authorId: string,
  authorName: string
): Promise<UserQuiz> => {
  const quizDoc = {
    ...quizData,
    authorId,
    authorName,
    publishedAt: Timestamp.now(),
    rating: 0,
    ratingsCount: 0,
    likesCount: 0,
  };

  const docRef = await db.collection(COLLECTIONS.QUIZZES).add(quizDoc);
  // Fetch the newly created document
  const snapshot = await docRef.get();

  // Return the data combined with the ID
  return {
    id: docRef.id,
    ...snapshot.data(),
  } as UserQuiz;
};

/**
 * Update an existing quiz
 */
export const updateQuiz = async (
  quizId: string,
  quizData: Partial<Omit<QuizFormState, "complexity" | "category">> & {
    complexity?: string;
    category?: string;
    status?: string;
  }
): Promise<UserQuiz> => {
  const quizRef = db.collection(COLLECTIONS.QUIZZES).doc(quizId);

  await quizRef.update(quizData);

  const updatedDoc = await quizRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  } as UserQuiz;
};

/**
 * Delete a quiz and all related data
 */
export const deleteQuiz = async (quizId: string): Promise<void> => {
  // Use a transaction to delete quiz and related completions
  await db.runTransaction(async (transaction: Transaction) => {
    const quizRef = db.collection(COLLECTIONS.QUIZZES).doc(quizId);

    // Delete the quiz
    transaction.delete(quizRef);

    // Also delete all quiz completions for this quiz
    const completionsSnapshot = await db
      .collection(COLLECTIONS.QUIZ_COMPLETIONS)
      .where("quizId", "==", quizId)
      .get();

    completionsSnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
      transaction.delete(doc.ref);
    });
  });
};

export const getFavorites = async (userId: string): Promise<string[]> => {
  const favoritesSnapshot = await db
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.FAVORITES)
    .get();

  return favoritesSnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data().quizId);
};

export const toggleUserFavorite = async (
  userId: string,
  quizId: string,
  action: ACTION
): Promise<void> => {
  const favoriteRef = db
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.FAVORITES)
    .doc(quizId);

  switch (action) {
    case ACTION.ADD:
      await favoriteRef.set({
        quizId,
        addedAt: FieldValue.serverTimestamp(),
      });
      break;
    case ACTION.REMOVE:
      await favoriteRef.delete();
      break;
    default:
      throw new Error("INVALID_ACTION");
  }
};

export const getFavoriteQuizList = async (userId: string): Promise<UserQuiz[]> => {
  // Get all favorite quiz IDs from subcollection
  const favoritesSnapshot = await db
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.FAVORITES)
    .orderBy("addedAt", "desc")
    .get();

  if (favoritesSnapshot.empty) {
    return [];
  }

  const quizIds = favoritesSnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data().quizId);

  // Firestore 'in' query supports max 30 items (updated limit), so chunk if needed
  const chunkSize = 30;
  const chunks: string[][] = [];
  for (let i = 0; i < quizIds.length; i += chunkSize) {
    chunks.push(quizIds.slice(i, i + chunkSize));
  }

  // Fetch all chunks in parallel
  const quizPromises = chunks.map((chunk) =>
    db.collection(COLLECTIONS.QUIZZES).where(FieldPath.documentId(), "in", chunk).get()
  );

  const snapshots = await Promise.all(quizPromises);

  // Combine all results and preserve the order from favorites
  const quizMap = new Map<string, UserQuiz>();
  snapshots.forEach((snapshot: QuerySnapshot) => {
    snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
      quizMap.set(doc.id, { id: doc.id, ...doc.data() } as UserQuiz);
    });
  });

  // Return quizzes in the order they were favorited
  return quizIds
    .map((id: string) => quizMap.get(id))
    .filter((quiz: UserQuiz | undefined): quiz is UserQuiz => quiz !== undefined);
};

// ============================================================================
// Quiz Likes Operations
// ============================================================================

/**
 * Get all liked quiz IDs for a user
 */
export const getLikes = async (userId: string): Promise<string[]> => {
  const likesSnapshot = await db
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.LIKES)
    .get();

  return likesSnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data().quizId);
};

/**
 * Toggle like status for a quiz
 * Also updates the quiz's likesCount
 */
export const toggleUserLike = async (
  userId: string,
  quizId: string,
  action: ACTION
): Promise<void> => {
  const likeRef = db
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .collection(COLLECTIONS.LIKES)
    .doc(quizId);

  const quizRef = db.collection(COLLECTIONS.QUIZZES).doc(quizId);

  // Use transaction to ensure atomicity
  await db.runTransaction(async (transaction: Transaction) => {
    const quizDoc = await transaction.get(quizRef);

    if (!quizDoc.exists) {
      throw new Error("QUIZ_NOT_FOUND");
    }

    const currentLikesCount = quizDoc.data()?.likesCount || 0;

    if (action === ACTION.ADD) {
      // Add like
      transaction.set(likeRef, {
        quizId,
        likedAt: FieldValue.serverTimestamp(),
      });

      // Increment quiz likesCount
      transaction.update(quizRef, {
        likesCount: currentLikesCount + 1,
      });
    } else {
      // Remove like
      transaction.delete(likeRef);

      // Decrement quiz likesCount (don't go below 0)
      transaction.update(quizRef, {
        likesCount: Math.max(0, currentLikesCount - 1),
      });
    }
  });
};
