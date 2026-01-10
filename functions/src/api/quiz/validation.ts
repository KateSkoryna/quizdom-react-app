import { onRequest } from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import { quizSchema } from "../../schemas/quizSchema";
import { COLLECTIONS, corsOptions } from "../../utils/constants";
import { verifyAuthToken } from "../../utils/authHelper";
import * as logger from "firebase-functions/logger";

/**
 * POST /validateQuizData
 * Validate quiz data before submission
 * Body: QuizFormState
 */
export const validateQuizData = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

  try {
    const validatedQuiz = quizSchema.parse(req.body); // Zod parse

    res.status(200).json({
      success: true,
      message: "Quiz validation successful",
      data: validatedQuiz,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
});

/**
 * Firestore trigger to validate quiz data before creation
 */
export const validateQuizOnCreate = functions.firestore
  .document(`${COLLECTIONS.QUIZZES}/{quizId}`)
  .onCreate(async (snap, context) => {
    const quizData = snap.data();

    try {
      quizSchema.parse(quizData);
      logger.info(`Quiz ${context.params.quizId} validated successfully`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Invalid quiz data for ${context.params.quizId}: ${error.message}`);
        await snap.ref.delete();
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Quiz validation failed: ${error.message}`
        );
      }
      throw error;
    }
  });

/**
 * Firestore trigger to validate quiz data before update
 */
export const validateQuizOnUpdate = functions.firestore
  .document(`${COLLECTIONS.QUIZZES}/{quizId}`)
  .onUpdate(async (change, context) => {
    const newQuizData = change.after.data();

    try {
      quizSchema.parse(newQuizData);
      logger.info(`Quiz ${context.params.quizId} update validated successfully`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Invalid quiz update for ${context.params.quizId}: ${error.message}`);
        // Rollback to previous data
        await change.after.ref.set(change.before.data(), { merge: true });
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Quiz validation failed: ${error.message}`
        );
      }
      throw error;
    }
  });
