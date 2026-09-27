import { describe, expect, it } from "vitest";
import {
  buildQuizEmbeddingText,
  extractIntentHeuristically,
  hashEmbeddingText,
  rankByKeywords,
  resolveFilters,
  searchQuizzesSemantically,
} from "../src/services/quiz-search-service";
import { QUIZZES, makeDeps, makeQuiz } from "./fixtures";

const ids = (results: Array<{ quiz: { id: string } }>) => results.map(({ quiz }) => quiz.id);

describe("buildQuizEmbeddingText", () => {
  it("includes title, description, category, difficulty and question titles", () => {
    const text = buildQuizEmbeddingText(QUIZZES[0]);

    expect(text).toContain("Title: React Hooks Basics");
    expect(text).toContain("Description: Learn how useEffect");
    expect(text).toContain("Category: ReactJS");
    expect(text).toContain("Difficulty: Beginner");
    expect(text).toContain("- When does useEffect run?");
    expect(text).toContain("- What does a state setter return?");
  });

  it("excludes answers and hints so correct answers never leak into the index", () => {
    const quiz = makeQuiz({
      id: "q",
      questions: [
        {
          questionTitle: "Pick one",
          hint: "secret-hint",
          answers: [{ answer: "secret-answer", isCorrect: true }],
        },
      ],
    });

    const text = buildQuizEmbeddingText(quiz);

    expect(text).not.toContain("secret-answer");
    expect(text).not.toContain("secret-hint");
  });
});

describe("hashEmbeddingText", () => {
  it("is stable for identical input and changes with content or model", () => {
    const base = hashEmbeddingText("text", "model-a");

    expect(hashEmbeddingText("text", "model-a")).toBe(base);
    expect(hashEmbeddingText("text 2", "model-a")).not.toBe(base);
    expect(hashEmbeddingText("text", "model-b")).not.toBe(base);
  });
});

describe("extractIntentHeuristically", () => {
  it.each([
    ["easy react hooks quiz", "ReactJS", "Beginner"],
    ["advanced node.js streams", "NodeJS", "Advanced"],
    ["Next.js app router caching", "NextJS", undefined],
    ["typescript generics for experts", "TypeScript", "Expert"],
    ["intermediate questions about closures", "JavaScript", "Medium"],
    ["screen reader and aria labels", "Web Accessibility", undefined],
    ["something fun to learn", undefined, undefined],
  ])("parses %j", (query, category, complexity) => {
    const intent = extractIntentHeuristically(query);

    expect(intent.category).toBe(category);
    expect(intent.complexity).toBe(complexity);
    expect(intent.source).toBe("heuristic");
    expect(intent.semanticQuery).toBe(query);
  });
});

describe("resolveFilters", () => {
  it("prefers explicit filters over inferred ones and tracks which were inferred", () => {
    const { filters, inferredKeys } = resolveFilters(
      { category: "TypeScript" },
      { category: "ReactJS", complexity: "Expert", semanticQuery: "q", source: "llm" }
    );

    expect(filters).toEqual({ category: "TypeScript", complexity: "Expert" });
    expect(inferredKeys).toEqual(["complexity"]);
  });
});

describe("rankByKeywords", () => {
  it("weights title matches above body matches and drops non-matches", () => {
    const results = rankByKeywords(QUIZZES, "generics useEffect");

    expect(ids(results)[0]).toBe("ts-generics");
    expect(ids(results)).not.toContain("a11y-aria");
  });

  it("returns nothing for an empty query", () => {
    expect(rankByKeywords(QUIZZES, "   ")).toEqual([]);
  });
});

describe("searchQuizzesSemantically", () => {
  it("ranks quizzes by semantic similarity to the query", async () => {
    const { deps } = makeDeps();

    const result = await searchQuizzesSemantically(deps, {
      query: "screen reader aria accessibility",
      limit: 3,
    });

    expect(result.mode).toBe("semantic");
    expect(ids(result.results)[0]).toBe("a11y-aria");
    expect(result.results[0].score).toBeGreaterThan(result.results[1]?.score ?? -Infinity);
  });

  it("applies LLM-extracted category and difficulty filters", async () => {
    const { deps, vectorStore } = makeDeps({
      intent: { category: "ReactJS", complexity: "Expert", semanticQuery: "react hooks state" },
    });

    const result = await searchQuizzesSemantically(deps, {
      query: "really hard questions on react hooks",
      limit: 5,
    });

    expect(vectorStore.calls[0]).toEqual({ category: "ReactJS", complexity: "Expert" });
    expect(ids(result.results)).toEqual(["react-hooks-expert"]);
    expect(result.appliedFilters).toEqual({ category: "ReactJS", complexity: "Expert" });
    expect(result.relaxedFilters).toBe(false);
  });

  it("embeds the rewritten semantic query rather than the raw query", async () => {
    const embedded: string[] = [];
    const { deps } = makeDeps({ intent: { semanticQuery: "typescript generics types" } });
    const embedQuery = deps.embedQuery;
    deps.embedQuery = async (text) => {
      embedded.push(text);
      return embedQuery(text);
    };

    const result = await searchQuizzesSemantically(deps, {
      query: "find me something tricky about TS type params",
      limit: 1,
    });

    expect(embedded).toEqual(["typescript generics types"]);
    expect(ids(result.results)).toEqual(["ts-generics"]);
  });

  it("lets explicit filters override inferred ones", async () => {
    const { deps, vectorStore } = makeDeps({ intent: { category: "ReactJS" } });

    const result = await searchQuizzesSemantically(deps, {
      query: "generics types",
      limit: 5,
      filters: { category: "TypeScript" },
    });

    expect(vectorStore.calls[0]).toEqual({ category: "TypeScript" });
    expect(ids(result.results)).toEqual(["ts-generics"]);
  });

  it("relaxes inferred filters when they eliminate every result", async () => {
    const { deps, vectorStore } = makeDeps({
      intent: { category: "Jest", complexity: "Expert", semanticQuery: "node streams event loop" },
    });

    const result = await searchQuizzesSemantically(deps, {
      query: "expert jest node streams",
      limit: 1,
    });

    expect(vectorStore.calls).toEqual([{ category: "Jest", complexity: "Expert" }, {}]);
    expect(result.relaxedFilters).toBe(true);
    expect(result.appliedFilters).toEqual({});
    expect(ids(result.results)).toEqual(["node-event-loop"]);
  });

  it("never relaxes filters the caller set explicitly", async () => {
    const { deps, vectorStore } = makeDeps({ intent: { complexity: "Expert" } });

    const result = await searchQuizzesSemantically(deps, {
      query: "node streams",
      limit: 5,
      filters: { category: "Jest" },
    });

    expect(vectorStore.calls).toEqual([
      { category: "Jest", complexity: "Expert" },
      { category: "Jest" },
    ]);
    expect(result.results).toEqual([]);
    expect(result.appliedFilters).toEqual({ category: "Jest" });
  });

  it("drops drafts and embeddings whose quiz no longer exists", async () => {
    const { deps } = makeDeps({ orphanEmbeddingIds: ["deleted-quiz"] });

    const result = await searchQuizzesSemantically(deps, {
      query: "react hooks useeffect state",
      limit: 10,
    });

    expect(ids(result.results)).not.toContain("react-draft");
    expect(ids(result.results)).not.toContain("deleted-quiz");
    expect(ids(result.results)[0]).toBe("react-hooks-beginner");
  });

  it("drops results that no longer match filters even if the index is stale", async () => {
    const stale = makeQuiz({ ...QUIZZES[0], complexity: "Advanced" });
    const { deps } = makeDeps({
      intent: { category: "ReactJS", complexity: "Beginner" },
      getQuizzesByIds: async (requested) =>
        requested.map((id) => (id === stale.id ? stale : QUIZZES.find((q) => q.id === id)!)),
    });

    const result = await searchQuizzesSemantically(deps, {
      query: "react hooks",
      limit: 5,
      filters: { category: "ReactJS", complexity: "Beginner" },
    });

    expect(ids(result.results)).not.toContain(stale.id);
  });

  it("respects limit and minScore", async () => {
    const { deps } = makeDeps();

    const limited = await searchQuizzesSemantically(deps, { query: "react hooks", limit: 1 });
    const thresholded = await searchQuizzesSemantically(deps, {
      query: "react hooks",
      limit: 10,
      minScore: 0.99,
    });

    expect(limited.results).toHaveLength(1);
    expect(thresholded.results.every(({ score }) => score >= 0.99)).toBe(true);
    expect(thresholded.results.length).toBeLessThan(5);
  });

  it("falls back to heuristic filter extraction when the LLM fails", async () => {
    const { deps, vectorStore } = makeDeps({
      extractIntent: async () => {
        throw new Error("LLM unavailable");
      },
    });

    const result = await searchQuizzesSemantically(deps, {
      query: "beginner react hooks",
      limit: 5,
    });

    expect(result.intent.source).toBe("heuristic");
    expect(vectorStore.calls[0]).toEqual({ category: "ReactJS", complexity: "Beginner" });
    expect(ids(result.results)).toEqual(["react-hooks-beginner"]);
  });

  it("falls back to keyword search when embedding fails", async () => {
    const { deps, vectorStore } = makeDeps({
      intent: { category: "TypeScript" },
      embedQuery: async () => {
        throw new Error("Embedding API down");
      },
    });

    const result = await searchQuizzesSemantically(deps, { query: "generics", limit: 5 });

    expect(result.mode).toBe("keyword");
    expect(vectorStore.calls).toEqual([]);
    expect(ids(result.results)).toEqual(["ts-generics"]);
  });
});
