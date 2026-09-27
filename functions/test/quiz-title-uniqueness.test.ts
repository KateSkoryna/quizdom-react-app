import { EventEmitter } from "node:events";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { normalizeQuizTitle } from "../src/utils/quizTitle";

const isQuizTitleTaken = vi.fn(async (_title: string, _excludeQuizId?: string) => false);
const createQuiz = vi.fn(async (quiz: object) => ({ id: "new-quiz", ...quiz }));
const updateQuiz = vi.fn(async (quizId: string, quiz: object) => ({ id: quizId, ...quiz }));

vi.mock("../src/services/quiz-service", () => ({
  isQuizTitleTaken,
  createQuiz,
  updateQuiz,
  getQuizById: async (id: string) => ({ id, authorId: "author-uid" }),
  getQuizzes: vi.fn(),
  getQuizzesByUserId: vi.fn(),
  deleteQuiz: vi.fn(),
}));

vi.mock("../src/utils/authHelper", () => ({
  verifyAuthToken: async () => ({ uid: "author-uid", email: "author@example.com" }),
}));

const quizzesApi = await import("../src/api/quiz/quizzes");

const validQuiz = {
  title: "Closures in Practice",
  description: "Scopes, closures and the pitfalls around them.",
  status: "done",
  complexity: "Medium",
  category: "JavaScript",
  questions: Array.from({ length: 6 }, (_, i) => ({
    questionTitle: `Question number ${i + 1}`,
    answers: [
      { answer: "Yes", isCorrect: true },
      { answer: "No", isCorrect: false },
    ],
    hint: "Think",
  })),
};

interface MockResponse {
  statusCode: number;
  body: { success?: boolean; error?: string };
}

const call = (
  handler: unknown,
  method: string,
  body: object,
  query: Record<string, string> = {}
) =>
  new Promise<MockResponse>((resolve, reject) => {
    const headers: Record<string, string> = {};
    const response: MockResponse = { statusCode: 200, body: {} };

    const res = Object.assign(new EventEmitter(), {
      setHeader: (name: string, value: string) => void (headers[name.toLowerCase()] = value),
      getHeader: (name: string) => headers[name.toLowerCase()],
      status(code: number) {
        response.statusCode = code;
        return res;
      },
      json(payload: MockResponse["body"]) {
        response.body = payload;
        resolve(response);
        return res;
      },
      end: () => resolve(response),
    });

    const req = Object.assign(new EventEmitter(), { method, query, headers: {}, url: "/", body });

    Promise.resolve((handler as (req: unknown, res: unknown) => unknown)(req, res)).catch(reject);
  });

describe("normalizeQuizTitle", () => {
  it("ignores case, surrounding and repeated whitespace", () => {
    expect(normalizeQuizTitle("  Beginner   JavaScript Fundamentals QUIZ ")).toBe(
      "beginner javascript fundamentals quiz"
    );
  });
});

describe("quiz title uniqueness", () => {
  beforeEach(() => {
    isQuizTitleTaken.mockReset().mockResolvedValue(false);
    createQuiz.mockClear();
    updateQuiz.mockClear();
  });

  it("rejects creating a quiz whose title is already in use", async () => {
    isQuizTitleTaken.mockResolvedValue(true);

    const response = await call(quizzesApi.createQuiz, "POST", validQuiz);

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toMatch(/already in use/);
    expect(createQuiz).not.toHaveBeenCalled();
  });

  it("creates the quiz when the title is free", async () => {
    const response = await call(quizzesApi.createQuiz, "POST", validQuiz);

    expect(response.statusCode).toBe(201);
    expect(isQuizTitleTaken).toHaveBeenCalledWith("Closures in Practice");
    expect(createQuiz).toHaveBeenCalledOnce();
  });

  it("rejects renaming a quiz to a title another quiz uses", async () => {
    isQuizTitleTaken.mockResolvedValue(true);

    const response = await call(
      quizzesApi.updateQuiz,
      "PUT",
      { title: "Taken Title" },
      { quizId: "quiz-1" }
    );

    expect(response.statusCode).toBe(409);
    expect(isQuizTitleTaken).toHaveBeenCalledWith("Taken Title", "quiz-1");
    expect(updateQuiz).not.toHaveBeenCalled();
  });

  it("skips the title check when an update does not change the title", async () => {
    const response = await call(
      quizzesApi.updateQuiz,
      "PUT",
      { description: "A brand new description text." },
      { quizId: "quiz-1" }
    );

    expect(response.statusCode).toBe(200);
    expect(isQuizTitleTaken).not.toHaveBeenCalled();
  });
});
