import { beforeEach, describe, expect, it, vi } from "vitest";
import { QUIZZES } from "./fixtures";

const store = new Map<string, Record<string, unknown>>();
const embed = vi.fn(async () => [{ embedding: [0.1, 0.2, 0.3] }]);

vi.mock("../src/config/firestore", () => ({
  db: {
    collection: () => ({
      doc: (id: string) => ({
        get: async () => ({ get: (field: string) => store.get(id)?.[field] }),
        set: async (data: Record<string, unknown>) => void store.set(id, data),
        delete: async () => void store.delete(id),
      }),
    }),
  },
}));

vi.mock("../src/services/quiz-ai-service", () => ({ ai: { embed } }));

vi.mock("firebase-admin/firestore", () => ({
  FieldValue: {
    vector: (values: number[]) => ({ vector: values }),
    serverTimestamp: () => "timestamp",
  },
}));

const { syncQuizEmbedding } = await import("../src/services/quiz-embedding-service");

const [published] = QUIZZES;

describe("syncQuizEmbedding", () => {
  beforeEach(() => {
    store.clear();
    embed.mockClear();
  });

  it("indexes a newly published quiz with its filterable fields", async () => {
    const outcome = await syncQuizEmbedding(published.id, published);

    expect(outcome).toBe("indexed");
    expect(embed).toHaveBeenCalledWith(
      expect.objectContaining({
        options: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: 768 },
      })
    );
    expect(store.get(published.id)).toMatchObject({
      quizId: published.id,
      embedding: { vector: [0.1, 0.2, 0.3] },
      category: "ReactJS",
      complexity: "Beginner",
      model: "gemini-embedding-001",
    });
  });

  it("skips re-embedding when only non-content fields change", async () => {
    await syncQuizEmbedding(published.id, published);
    embed.mockClear();

    const outcome = await syncQuizEmbedding(
      published.id,
      { ...published, likesCount: 42, rating: 5 },
      published
    );

    expect(outcome).toBe("unchanged");
    expect(embed).not.toHaveBeenCalled();
  });

  it("indexes a previously unindexed quiz on its next write even if content is unchanged", async () => {
    const outcome = await syncQuizEmbedding(
      published.id,
      { ...published, likesCount: 1 },
      published
    );

    expect(outcome).toBe("indexed");
    expect(store.has(published.id)).toBe(true);
  });

  it("re-embeds when searchable content changes", async () => {
    await syncQuizEmbedding(published.id, published);
    embed.mockClear();

    const updated = { ...published, title: "React Hooks Fundamentals" };
    const outcome = await syncQuizEmbedding(published.id, updated, published);

    expect(outcome).toBe("indexed");
    expect(embed).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["the quiz is deleted", undefined],
    ["the quiz becomes a draft", { ...published, status: "draft" as const }],
  ])("removes the embedding when %s", async (_label, after) => {
    await syncQuizEmbedding(published.id, published);

    const outcome = await syncQuizEmbedding(published.id, after, published);

    expect(outcome).toBe("removed");
    expect(store.has(published.id)).toBe(false);
  });
});
