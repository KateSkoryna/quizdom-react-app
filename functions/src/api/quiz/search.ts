import { onRequest } from "firebase-functions/v2/https";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { verifyAuthToken } from "../../utils/authHelper";
import { COLLECTIONS, corsOptions } from "../../utils/constants";
import { getQuizzes as getAllQuizzes, getQuizzesByIds } from "../../services/quiz-service";
import {
  DEFAULT_SEARCH_LIMIT,
  MAX_SEARCH_LIMIT,
  MAX_SEARCH_QUERY_LENGTH,
  isComplexity,
  isQuizCategory,
  searchQuizzesSemantically,
} from "../../services/quiz-search-service";
import {
  embedSearchQuery,
  firestoreVectorStore,
  reindexAllQuizEmbeddings,
  syncQuizEmbedding,
} from "../../services/quiz-embedding-service";
import { extractSearchIntent } from "../../services/quiz-search-ai-service";
import type { UserQuiz } from "../../types/quiz";
import type { SemanticSearchDependencies } from "../../types/search";

const KEYWORD_FALLBACK_CANDIDATES = 200;

// v2 Firestore triggers must run in a region matching the database location (eur3)
const FIRESTORE_TRIGGER_REGION = "europe-west1";

const searchDependencies: SemanticSearchDependencies = {
  extractIntent: extractSearchIntent,
  embedQuery: embedSearchQuery,
  vectorStore: firestoreVectorStore,
  getQuizzesByIds,
  getKeywordCandidates: (filters) =>
    getAllQuizzes({ ...filters, limit: KEYWORD_FALLBACK_CANDIDATES }),
  logger,
};

const readParam = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

/**
 * GET /searchQuizzes
 * Natural-language quiz search backed by vector embeddings
 * Query params: q (required), limit, category, complexity, minScore
 */
export const searchQuizzes = onRequest({ ...corsOptions, maxInstances: 10 }, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const query = readParam(req.query.q);
  if (!query) {
    res.status(400).json({ success: false, error: "q is required" });
    return;
  }
  if (query.length > MAX_SEARCH_QUERY_LENGTH) {
    res.status(400).json({
      success: false,
      error: `q must be at most ${MAX_SEARCH_QUERY_LENGTH} characters`,
    });
    return;
  }

  const category = readParam(req.query.category);
  if (category && !isQuizCategory(category)) {
    res.status(400).json({ success: false, error: "Invalid category" });
    return;
  }

  const complexity = readParam(req.query.complexity);
  if (complexity && !isComplexity(complexity)) {
    res.status(400).json({ success: false, error: "Invalid complexity" });
    return;
  }

  const requestedLimit = Number(readParam(req.query.limit) ?? DEFAULT_SEARCH_LIMIT);
  const limit = Number.isInteger(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), MAX_SEARCH_LIMIT)
    : DEFAULT_SEARCH_LIMIT;

  const requestedMinScore = readParam(req.query.minScore);
  const minScore = requestedMinScore === undefined ? undefined : Number(requestedMinScore);
  if (minScore !== undefined && (Number.isNaN(minScore) || minScore < -1 || minScore > 1)) {
    res.status(400).json({ success: false, error: "minScore must be between -1 and 1" });
    return;
  }

  try {
    const result = await searchQuizzesSemantically(searchDependencies, {
      query,
      limit,
      minScore,
      filters: {
        category: category && isQuizCategory(category) ? category : undefined,
        complexity: complexity && isComplexity(complexity) ? complexity : undefined,
      },
    });

    res.status(200).json({
      success: true,
      data: result.results.map(({ quiz, score }) => ({
        ...quiz,
        score: Math.round(score * 1000) / 1000,
      })),
      search: {
        mode: result.mode,
        appliedFilters: result.appliedFilters,
        relaxedFilters: result.relaxedFilters,
        topic: result.intent.topic ?? null,
        intentSource: result.intent.source,
        offTopic: result.offTopic,
      },
    });
  } catch (error) {
    logger.error("Semantic quiz search failed", error);
    res.status(500).json({ success: false, error: "Failed to search quizzes" });
  }
});

/**
 * Keeps the quizEmbeddings vector index in sync with published quizzes
 */
export const syncQuizEmbeddingOnWrite = onDocumentWritten(
  { document: `${COLLECTIONS.QUIZZES}/{quizId}`, region: FIRESTORE_TRIGGER_REGION },
  async (event) => {
    const quizId = event.params.quizId;
    const before = event.data?.before.exists
      ? (event.data.before.data() as Partial<UserQuiz>)
      : undefined;
    const after = event.data?.after.exists
      ? (event.data.after.data() as Partial<UserQuiz>)
      : undefined;

    const outcome = await syncQuizEmbedding(quizId, after, before);
    logger.info(`Quiz ${quizId} embedding sync: ${outcome}`);
  }
);

/**
 * POST /reindexQuizEmbeddings
 * Admin-only backfill of embeddings for all published quizzes
 */
export const reindexQuizEmbeddings = onRequest(
  { ...corsOptions, timeoutSeconds: 540, maxInstances: 1 },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ success: false, error: "Method not allowed" });
      return;
    }

    const user = await verifyAuthToken(req, res);
    if (!user) return;

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || user.email !== adminEmail) {
      res.status(403).json({ success: false, error: "Forbidden: Admin access only" });
      return;
    }

    try {
      const counts = await reindexAllQuizEmbeddings();
      res.status(200).json({ success: true, data: counts });
    } catch (error) {
      logger.error("Quiz embedding reindex failed", error);
      res.status(500).json({ success: false, error: "Failed to reindex quiz embeddings" });
    }
  }
);
