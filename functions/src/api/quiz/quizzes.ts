import { onRequest } from "firebase-functions/v2/https";
import { verifyAuthToken } from "../../utils/authHelper";
import { quizSchema } from "../../schemas/quizSchema";
import {
  getQuizzes as getAllQuizzes,
  getQuizById as getQuizByIdService,
  getQuizzesByUserId as getQuizzesByUserIdService,
  createQuiz as createQuizService,
  updateQuiz as updateQuizService,
  deleteQuiz as deleteQuizService,
} from "../../services/quiz-service";

const corsOptions = {
  cors: ["https://kateskoryna.github.io", "http://localhost:5173"],
  invoker: "public" as const,
};

/**
 * GET /getQuizzes
 * Get all quizzes with optional filters
 * Query params: category, complexity, limit, offset
 */
export const getQuizzes = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const category = req.query.category as string | undefined;
  const complexity = req.query.complexity as string | undefined;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

  try {
    const quizzes = await getAllQuizzes({ category, complexity, limit, offset });
    res.status(200).json({
      success: true,
      data: quizzes,
      pagination: {
        limit,
        offset,
        total: quizzes.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch quizzes",
    });
  }
});

/**
 * GET /getQuizById
 * Get single quiz by ID
 * Query param: quizId
 */
export const getQuizById = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const quizId = req.query.quizId as string;
  if (!quizId) {
    res.status(400).json({ success: false, error: "quizId is required" });
    return;
  }

  try {
    const quiz = await getQuizByIdService(quizId);
    if (!quiz) {
      res.status(404).json({ success: false, error: "Quiz not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to fetch quiz",
    });
  }
});

/**
 * GET /getQuizzesByUserId
 * Get all quizzes created by a specific user
 * Query param: userId
 */
export const getQuizzesByUserId = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const userId = req.query.userId as string;
  const status = req.query.status as string | undefined;

  if (!userId) {
    res.status(400).json({ success: false, error: "userId is required" });
    return;
  }

  try {
    const quizzes = await getQuizzesByUserIdService(userId, status);
    res.status(200).json({
      success: true,
      data: quizzes,
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to fetch user quizzes",
    });
  }
});

/**
 * POST /createQuiz
 * Create a new quiz (authenticated)
 * Body: QuizFormState
 */
export const createQuiz = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const user = await verifyAuthToken(req, res);
  if (!user) {
    res.status(400).json({ success: false, error: "userId is required" });
    return;
  }

  try {
    // Validate quiz data using Zod
    const validatedQuiz = quizSchema.parse(req.body); // <- Zod parses and throws if invalid

    // Create quiz with author info
    const quiz = await createQuizService(
      validatedQuiz,
      user.uid,
      user.name || user.email || "Anonymous"
    );

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
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
        error: "Failed to create quiz",
      });
    }
  }
});

/**
 * PUT /updateQuiz
 * Update an existing quiz (authenticated, author only)
 * Query param: quizId
 * Body: Partial<QuizFormState>
 */
export const updateQuiz = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "PUT") {
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
    const existingQuiz = await getQuizByIdService(quizId);
    if (!existingQuiz) {
      res.status(404).json({ success: false, error: "Quiz not found" });
      return;
    }

    if (existingQuiz.authorId !== user.uid) {
      res.status(403).json({
        success: false,
        error: "Forbidden - You can only update your own quizzes",
      });
      return;
    }

    // Validate update data (partial allowed)
    const validatedQuiz = quizSchema.partial().parse(req.body);

    await updateQuizService(quizId, validatedQuiz);

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
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
        error: "Failed to update quiz",
      });
    }
  }
});
/**
 * DELETE /deleteQuiz
 * Delete a quiz (authenticated, author only)
 * Query param: quizId
 */
export const deleteQuiz = onRequest(corsOptions, async (req, res) => {
  if (req.method !== "DELETE") {
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
    // Check if quiz exists and user is the author
    const existingQuiz: any = await getQuizByIdService(quizId);
    if (!existingQuiz) {
      res.status(404).json({ success: false, error: "Quiz not found" });
      return;
    }

    if (existingQuiz.authorId !== user.uid) {
      res.status(403).json({
        success: false,
        error: "Forbidden - You can only delete your own quizzes",
      });
      return;
    }

    await deleteQuizService(quizId);

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error: any) {
    void error;
    res.status(500).json({
      success: false,
      error: "Failed to delete quiz",
    });
  }
});
