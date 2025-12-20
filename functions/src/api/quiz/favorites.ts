import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import { getFavorites, toggleUserFavorite, getFavoriteQuizList } from "../../services/quiz-service";
import { ACTION } from "../../utils/constants";

const corsOptions = {
  cors: ["https://kateskoryna.github.io", "http://localhost:5173"],
  invoker: "public" as const,
};

/**
 * GET /getUserFavorites
 * Get array of favorite quiz IDs for authenticated user
 */
export const getUserFavorites = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = user.uid;

  try {
    const favoriteQuizIds = await getFavorites(userId);
    res.status(200).json({
      success: true,
      data: favoriteQuizIds,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to fetch quizzes IDs",
    });
  }
});

/**
 * GET /getFavoriteQuizzes
 * Get full quiz data for favorite quizzes
 * Query param: quizIds (comma-separated)
 */
export const getFavoriteQuizzes = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }
  // 2. Verify auth token (optional, or we can make this public)
  const user = await verifyAuthToken(req, res);
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const quizIdsParam = req.query.quizIds as string;

  if (!quizIdsParam) {
    res.status(400).json({ success: false, error: "quizIds parameter is required" });
    return;
  }

  const favoriteQuizIds = quizIdsParam.split(",").map((id) => id.trim());

  try {
    const favoriteQuizzes = await getFavoriteQuizList(favoriteQuizIds);
    res.status(200).json({
      success: true,
      data: favoriteQuizzes,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to fetch quizzes",
    });
  }
});

/**
 * POST /toggleFavorite
 * Add or remove a quiz from user's favorites
 * Body: { quizId: string, action: 'add' | 'remove' }
 */

export const toggleFavorite = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { quizId, action } = req.body;

  if (!quizId) {
    res.status(400).json({ success: false, error: "quizId is required" });
    return;
  }

  if (!action || (action !== ACTION.ADD && action !== ACTION.REMOVE)) {
    res.status(400).json({
      success: false,
      error: "action must be 'add' or 'remove'",
    });
    return;
  }

  try {
    await toggleUserFavorite(user.uid, quizId, action);
    res.status(200).json({
      success: true,
      message: `Quiz ${action === ACTION.ADD ? "added to" : "removed from"} favorites`,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to update favorites",
    });
  }
});
