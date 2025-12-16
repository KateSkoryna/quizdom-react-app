import { onRequest } from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import { quizSchema } from "../../schemas/quizSchema";
import { ValidationError as YupValidationError } from "yup";
import { COLLECTIONS } from "../../utils/constants";
import { verifyAuthToken } from "../../utils/authHelper";
import * as logger from "firebase-functions/logger";

const corsOptions = {
  cors: ["https://kateskoryna.github.io", "http://localhost:5173"],
  invoker: "public" as const,
};

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
    const validatedQuiz = await quizSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    res.status(200).json({
      success: true,
      message: "Quiz validation successful",
      data: validatedQuiz,
    });
  } catch (error) {
    if (error instanceof YupValidationError) {
      const errorMessage = error.errors.join("; ");
      res.status(400).json({
        success: false,
        error: errorMessage,
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
  .document(`${COLLECTIONS.QUIZES}/{quizId}`)
  .onCreate(async (snap, context) => {
    const quizData = snap.data();

    try {
      await quizSchema.validate(quizData, {
        abortEarly: false,
        stripUnknown: true,
      });

      logger.info(`Quiz ${context.params.quizId} validated successfully`);
    } catch (error) {
      if (error instanceof YupValidationError) {
        const errorMessage = error.errors.join("; ");
        logger.error(`Invalid quiz data for ${context.params.quizId}: ${errorMessage}`);
        await snap.ref.delete();
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Quiz validation failed: ${errorMessage}`
        );
      }
      throw error;
    }
  });

/**
 * Firestore trigger to validate quiz data before update
 */
export const validateQuizOnUpdate = functions.firestore
  .document(`${COLLECTIONS.QUIZES}/{quizId}`)
  .onUpdate(async (change, context) => {
    const newQuizData = change.after.data();

    try {
      await quizSchema.validate(newQuizData, {
        abortEarly: false,
        stripUnknown: true,
      });

      logger.info(`Quiz ${context.params.quizId} update validated successfully`);
    } catch (error) {
      if (error instanceof YupValidationError) {
        const errorMessage = error.errors.join("; ");
        logger.error(`Invalid quiz update for ${context.params.quizId}: ${errorMessage}`);
        await change.after.ref.update(change.before.data());
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Quiz validation failed: ${errorMessage}`
        );
      }
      throw error;
    }
  });
