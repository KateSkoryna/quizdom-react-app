import { db } from "../config/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { COLLECTIONS } from "../utils/constants";
import type { QuizCompletion } from "../types/quiz";

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
    .collection(COLLECTIONS.QUIZES)
    .doc(quizId)
    .update({
      rating: Math.round(averageRating * 10) / 10,
      ratingsCount: ratings.length,
    });
}
