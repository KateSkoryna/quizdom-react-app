import { db } from "../config/firestore";
import { FieldValue, FieldPath } from "firebase-admin/firestore";
import { COLLECTIONS, ACTION } from "../utils/constants";
import type { QuizCompletion, UserQuiz } from "../types/quiz";

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

export const createQuizCompletion = async (
  userId: string,
  quizId: string,
  score: { totalQuestions: number; correctAnswers: number }
): Promise<void> => {
  return await db.runTransaction(async (transaction) => {
    const completionRef = db
      .collection(COLLECTIONS.QUIZ_COMPLETIONS)
      .where("quizId", "==", quizId)
      .where("userId", "==", userId);

    const completionSnapshot = await transaction.get(completionRef);

    if (!completionSnapshot.empty) {
      throw new Error("ALREADY_COMPLETED");
    }

    const newCompletionRef = db.collection(COLLECTIONS.QUIZ_COMPLETIONS).doc();
    const completionData: QuizCompletion = {
      quizId,
      userId,
      score,
      completedAt: FieldValue.serverTimestamp() as any,
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
  const updateData: Partial<QuizCompletion> = {
    feedbackUpdatedAt: FieldValue.serverTimestamp() as any,
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
    .map((doc) => doc.data().rating)
    .filter((rating): rating is number => rating !== undefined && rating !== null);

  if (ratings.length === 0) {
    return;
  }

  const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

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
 * Get all quizzes with optional filtering and pagination
 */
export const getQuizzes = async (filters: QuizFilters = {}): Promise<UserQuiz[]> => {
  const { category, complexity, limit = 100, offset = 0 } = filters;

  let query = db.collection(COLLECTIONS.QUIZZES);

  // Apply filters
  if (category) {
    query = query.where("category", "==", category) as any;
  }
  if (complexity) {
    query = query.where("complexity", "==", complexity) as any;
  }

  // Order by publishedAt descending (newest first)
  query = query.orderBy("publishedAt", "desc") as any;

  // Apply pagination
  if (offset > 0) {
    query = query.offset(offset) as any;
  }
  query = query.limit(limit) as any;

  const snapshot = await query.get();

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as UserQuiz
  );
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
 */
export const getQuizzesByUserId = async (userId: string, status?: string): Promise<UserQuiz[]> => {
  let query = db.collection(COLLECTIONS.QUIZZES).where("authorId", "==", userId);

  if (status) {
    query = query.where("status", "==", status) as any;
  }

  query = query.orderBy("publishedAt", "desc") as any;

  const snapshot = await query.get();

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as UserQuiz
  );
};

/**
 * Create a new quiz
 */
export const createQuiz = async (
  quizData: any,
  authorId: string,
  authorName: string
): Promise<string> => {
  const quizDoc = {
    ...quizData,
    authorId,
    authorName,
    publishedAt: FieldValue.serverTimestamp(),
    status: "done",
    rating: 0,
    ratingsCount: 0,
    likesCount: 0,
  };

  const docRef = await db.collection(COLLECTIONS.QUIZZES).add(quizDoc);
  return docRef.id;
};

/**
 * Update an existing quiz
 */
export const updateQuiz = async (quizId: string, quizData: any): Promise<UserQuiz> => {
  // Destructure to explicitly exclude protected fields
  const { authorId, authorName, publishedAt, ...allowedUpdates } = quizData;

  const quizRef = db.collection(COLLECTIONS.QUIZZES).doc(quizId);

  await quizRef.update(allowedUpdates);

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
  await db.runTransaction(async (transaction) => {
    const quizRef = db.collection(COLLECTIONS.QUIZZES).doc(quizId);

    // Delete the quiz
    transaction.delete(quizRef);

    // Also delete all quiz completions for this quiz
    const completionsSnapshot = await db
      .collection(COLLECTIONS.QUIZ_COMPLETIONS)
      .where("quizId", "==", quizId)
      .get();

    completionsSnapshot.docs.forEach((doc) => {
      transaction.delete(doc.ref);
    });
  });
};

export const getFavorites = async (userId: string): Promise<string[]> => {
  const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
  if (!userDoc.exists) {
    throw new Error("USER_NOT_FOUND");
  }

  const userData = userDoc.data();
  return userData?.favorites || [];
};

export const toggleUserFavorite = async (
  userId: string,
  quizId: string,
  action: ACTION
): Promise<void> => {
  const userRef = db.collection(COLLECTIONS.USERS).doc(userId);

  switch (action) {
    case ACTION.ADD:
      await userRef.update({
        favorites: FieldValue.arrayUnion(quizId),
      });
      break;
    case ACTION.REMOVE:
      await userRef.update({
        favorites: FieldValue.arrayRemove(quizId),
      });
      break;
    default:
      throw new Error("INVALID_ACTION");
  }
};

export const getFavoriteQuizList = async (quizIds: string[]): Promise<UserQuiz[]> => {
  if (!quizIds || quizIds.length === 0) {
    return [];
  }

  // Firestore 'in' query supports max 10 items, so we need to chunk if more
  // For now, let's limit to first 10 (you can enhance this later)
  const limitedIds = quizIds.slice(0, 10);

  const snapshot = await db
    .collection(COLLECTIONS.QUIZZES)
    .where(FieldPath.documentId(), "in", limitedIds)
    .get();

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as UserQuiz
  );
};
