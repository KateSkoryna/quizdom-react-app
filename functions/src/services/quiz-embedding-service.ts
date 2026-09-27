import { googleAI } from "@genkit-ai/google-genai";
import { FieldValue, Query } from "firebase-admin/firestore";
import { db } from "../config/firestore";
import { ai } from "./quiz-ai-service";
import { buildQuizEmbeddingText, hashEmbeddingText } from "./quiz-search-service";
import { COLLECTIONS } from "../utils/constants";
import type { UserQuiz } from "../types/quiz";
import type { SearchFilters, VectorMatch, VectorStore } from "../types/search";

export const EMBEDDING_MODEL = "gemini-embedding-001";
export const EMBEDDING_DIMENSIONS = 768;

type EmbeddingTaskType = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

const embedText = async (text: string, taskType: EmbeddingTaskType): Promise<number[]> => {
  const [result] = await ai.embed({
    embedder: googleAI.embedder(EMBEDDING_MODEL),
    content: text,
    options: { taskType, outputDimensionality: EMBEDDING_DIMENSIONS },
  });

  if (!result?.embedding?.length) {
    throw new Error("Embedding model returned an empty vector");
  }

  return result.embedding;
};

export const embedSearchQuery = (text: string) => embedText(text, "RETRIEVAL_QUERY");

export const firestoreVectorStore: VectorStore = {
  async findNearest(queryVector: number[], filters: SearchFilters, limit: number) {
    let query: Query = db.collection(COLLECTIONS.QUIZ_EMBEDDINGS);

    if (filters.category) query = query.where("category", "==", filters.category);
    if (filters.complexity) query = query.where("complexity", "==", filters.complexity);

    const snapshot = await query
      .findNearest({
        vectorField: "embedding",
        queryVector,
        limit: Math.min(limit, 1000),
        distanceMeasure: "COSINE",
        distanceResultField: "distance",
      })
      .get();

    return snapshot.docs.map((doc): VectorMatch => ({
      quizId: doc.id,
      distance: doc.get("distance") as number,
    }));
  },
};

const isSearchable = (quiz: Partial<UserQuiz> | undefined): quiz is UserQuiz =>
  quiz?.status === "done" && typeof quiz.title === "string" && typeof quiz.description === "string";

export type EmbeddingSyncOutcome = "indexed" | "removed" | "unchanged";

export const syncQuizEmbedding = async (
  quizId: string,
  after: Partial<UserQuiz> | undefined,
  before?: Partial<UserQuiz>
): Promise<EmbeddingSyncOutcome> => {
  const embeddingRef = db.collection(COLLECTIONS.QUIZ_EMBEDDINGS).doc(quizId);

  if (!isSearchable(after)) {
    await embeddingRef.delete();
    return "removed";
  }

  const text = buildQuizEmbeddingText(after);
  const contentHash = hashEmbeddingText(text, EMBEDDING_MODEL);
  const contentUnchanged =
    isSearchable(before) &&
    hashEmbeddingText(buildQuizEmbeddingText(before), EMBEDDING_MODEL) === contentHash;

  if (contentUnchanged) {
    const existing = await embeddingRef.get();
    if (existing.get("contentHash") === contentHash) return "unchanged";
  }

  const embedding = await embedText(text, "RETRIEVAL_DOCUMENT");

  await embeddingRef.set({
    quizId,
    embedding: FieldValue.vector(embedding),
    category: after.category,
    complexity: after.complexity,
    contentHash,
    model: EMBEDDING_MODEL,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return "indexed";
};

export const reindexAllQuizEmbeddings = async (): Promise<Record<EmbeddingSyncOutcome, number>> => {
  const counts: Record<EmbeddingSyncOutcome, number> = {
    indexed: 0,
    removed: 0,
    unchanged: 0,
  };

  const [quizzesSnapshot, embeddingsSnapshot] = await Promise.all([
    db.collection(COLLECTIONS.QUIZZES).where("status", "==", "done").get(),
    db.collection(COLLECTIONS.QUIZ_EMBEDDINGS).select("contentHash").get(),
  ]);

  const existingHashes = new Map(
    embeddingsSnapshot.docs.map((doc) => [doc.id, doc.get("contentHash") as string])
  );
  const liveQuizIds = new Set(quizzesSnapshot.docs.map((doc) => doc.id));

  for (const doc of quizzesSnapshot.docs) {
    const quiz = doc.data() as UserQuiz;
    const contentHash = hashEmbeddingText(buildQuizEmbeddingText(quiz), EMBEDDING_MODEL);

    if (existingHashes.get(doc.id) === contentHash) {
      counts.unchanged += 1;
      continue;
    }

    counts[await syncQuizEmbedding(doc.id, quiz)] += 1;
  }

  const orphanIds = [...existingHashes.keys()].filter((id) => !liveQuizIds.has(id));
  await Promise.all(
    orphanIds.map((id) => db.collection(COLLECTIONS.QUIZ_EMBEDDINGS).doc(id).delete())
  );
  counts.removed += orphanIds.length;

  return counts;
};
