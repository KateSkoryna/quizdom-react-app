import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { quizSchema } from "../../shared/schemas/quizSchema";
import { ValidationError as YupValidationError } from "yup";

admin.initializeApp();

/**
 * Callable function to validate quiz data using Yup schema
 * Call this from your frontend before submitting quiz data
 */
export const validateQuizData = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to validate quiz data"
    );
  }

  try {
    // Validate using Yup schema
    const validatedQuiz = await quizSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return {
      success: true,
      message: "Quiz validation successful",
      data: validatedQuiz,
    };
  } catch (error) {
    if (error instanceof YupValidationError) {
      // Format validation errors
      const errorMessage = error.errors.join("; ");
      throw new functions.https.HttpsError(
        "invalid-argument",
        errorMessage
      );
    }
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred during validation"
    );
  }
});

/**
 * Firestore trigger to validate quiz data before creation using Yup
 * This ensures no invalid quiz data gets stored in the database
 */
export const validateQuizOnCreate = functions.firestore
  .document("quizes/{quizId}")
  .onCreate(async (snap, context) => {
    const quizData = snap.data();

    try {
      await quizSchema.validate(quizData, {
        abortEarly: false,
        stripUnknown: true,
      });

      functions.logger.info(
        `Quiz ${context.params.quizId} validated successfully`
      );
    } catch (error) {
      if (error instanceof YupValidationError) {
        const errorMessage = error.errors.join("; ");
        functions.logger.error(
          `Invalid quiz data for ${context.params.quizId}: ${errorMessage}`
        );
        // Delete the invalid document
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
 * Firestore trigger to validate quiz data before update using Yup
 */
export const validateQuizOnUpdate = functions.firestore
  .document("quizes/{quizId}")
  .onUpdate(async (change, context) => {
    const newQuizData = change.after.data();

    try {
      await quizSchema.validate(newQuizData, {
        abortEarly: false,
        stripUnknown: true,
      });

      functions.logger.info(
        `Quiz ${context.params.quizId} update validated successfully`
      );
    } catch (error) {
      if (error instanceof YupValidationError) {
        const errorMessage = error.errors.join("; ");
        functions.logger.error(
          `Invalid quiz update for ${context.params.quizId}: ${errorMessage}`
        );
        // Revert to previous data
        await change.after.ref.update(change.before.data());
        throw new functions.https.HttpsError(
          "invalid-argument",
          `Quiz validation failed: ${errorMessage}`
        );
      }
      throw error;
    }
  });

/**
 * HTTP endpoint to validate quiz data using Yup (alternative to callable function)
 */
export const validateQuizHttp = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

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
