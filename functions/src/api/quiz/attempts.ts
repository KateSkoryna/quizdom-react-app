import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import {
  getQuizCompletion,
  getUserCompletions,
  createQuizCompletion,
  updateQuizFeedback,
} from "../../services/quiz-service";
import { corsOptions } from "../../utils/constants";

export const completeQuiz = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

  const { quizId, score } = req.body;
  if (
    !quizId ||
    !score ||
    score.totalQuestions === undefined ||
    score.correctAnswers === undefined
  ) {
    res.status(400).json({
      success: false,
      error: "quizId and score (totalQuestions & correctAnswers) are required",
    });
    return;
  }

  try {
    await createQuizCompletion(user.uid, quizId, score);
    res.status(201).json({
      success: true,
      message: "Quiz completed successfully",
    });
  } catch (error: any) {
    if (error.message === "ALREADY_COMPLETED") {
      res.status(409).json({
        success: false,
        error: "You have already completed this quiz",
      });
      return;
    }
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to complete quiz",
    });
  }
});

export const getQuizCompletionStatus = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

  const quizId = req.query.quizId as string;
  if (!quizId) {
    res.status(400).json({ success: false, error: "quizId is required" });
    return;
  }

  try {
    const completion = await getQuizCompletion(user.uid, quizId);
    res.status(200).json({
      success: true,
      completion,
    });
  } catch (_error) {
    res.status(500).json({
      success: false,
      error: "Failed to get quiz completion",
    });
  }
});

export const getAllUserCompletions = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

  try {
    const completions = await getUserCompletions(user.uid);
    res.status(200).json({
      success: true,
      completions,
    });
  } catch (_error) {
    res.status(500).json({
      success: false,
      error: "Failed to get user completions",
    });
  }
});

export const updateQuizCompletionFeedback = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "PATCH" && req.method !== "PUT") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

  const { quizId, rating, comment } = req.body;

  if (!quizId) {
    res.status(400).json({
      success: false,
      error: "quizId is required",
    });
    return;
  }

  if (rating === undefined && comment === undefined) {
    res.status(400).json({
      success: false,
      error: "Provide rating, comment, or both",
    });
    return;
  }

  if (rating !== undefined && (typeof rating !== "number" || rating < 1 || rating > 5)) {
    res.status(400).json({
      success: false,
      error: "Rating must be a number between 1 and 5",
    });
    return;
  }

  try {
    await updateQuizFeedback(user.uid, quizId, rating, comment);
    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
    });
  } catch (error: any) {
    if (error.message === "COMPLETION_NOT_FOUND") {
      res.status(404).json({
        success: false,
        error: "You must complete the quiz before leaving feedback",
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: "Failed to update feedback",
    });
  }
});
