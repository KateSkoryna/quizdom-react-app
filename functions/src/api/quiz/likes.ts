import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import { getLikes, toggleUserLike } from "../../services/quiz-service";
import { ACTION } from "../../utils/constants";

const corsOptions = {
  cors: ["https://kateskoryna.github.io", "http://localhost:5173"],
  invoker: "public" as const,
};

/**
 * GET /getUserLikes
 * Get array of liked quiz IDs for authenticated user
 */
export const getUserLikes = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

  try {
    const likedQuizIds = await getLikes(user.uid);
    res.status(200).json({
      success: true,
      data: likedQuizIds,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to fetch liked quiz IDs",
    });
  }
});

/**
 * POST /toggleLike
 * Add or remove a like from a quiz
 * Body: { quizId: string, action: 'add' | 'remove' }
 */
export const toggleLike = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) return;

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
    await toggleUserLike(user.uid, quizId, action);
    res.status(200).json({
      success: true,
      message: `Quiz ${action === ACTION.ADD ? "liked" : "unliked"}`,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to toggle like",
    });
  }
});
