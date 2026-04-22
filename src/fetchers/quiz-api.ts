import apiClient from "./axiosInstance";
import { UserQuiz } from "../types";
import { QuizFormState } from "../types";
import { Status } from "../components/modal/quizModal";

/**
 * Quiz API response with pagination info
 */
export interface QuizPageResponse {
  data: UserQuiz[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

/**
 * Parameters for fetching quizzes
 */
export interface FetchQuizzesParams {
  category?: string | null;
  complexity?: string | null;
  limit: number;
  offset: number;
}

/**
 * Fetch quizzes with pagination support for TanStack Query
 * This function throws errors that TanStack Query can handle
 */
export async function fetchQuizzes(params: FetchQuizzesParams): Promise<QuizPageResponse> {
  try {
    const queryParams: Record<string, string | number> = {
      limit: params.limit,
      offset: params.offset,
    };

    if (params.category) {
      queryParams.category = params.category;
    }

    if (params.complexity) {
      queryParams.complexity = params.complexity;
    }

    const response = await apiClient.get("/getQuizzes", {
      params: queryParams,
    });

    // Check if the API response indicates failure
    if (response.data.success === false) {
      throw new Error(response.data.error || "Failed to fetch quizzes");
    }

    // Transform the response data to include proper dates
    const quizzes = response.data.data.map((quiz: any) => ({
      ...quiz,
      publishedAt: quiz.publishedAt?._seconds
        ? new Date(quiz.publishedAt._seconds * 1000)
        : new Date(),
    }));

    return {
      data: quizzes,
      pagination: response.data.pagination || {
        limit: params.limit,
        offset: params.offset,
        total: quizzes.length,
      },
    };
  } catch (error: any) {
    // Transform error for better handling
    const errorMsg = error.response?.data?.error || error.message || "Failed to fetch quizzes";
    throw new Error(errorMsg);
  }
}

export async function fetchQuizById(quizId: string): Promise<UserQuiz> {
  try {
    const response = await apiClient.get("/getQuizById", {
      params: { quizId },
    });

    if (response.data.success === false) {
      throw new Error(response.data.error || "Failed to fetch quiz");
    }

    const quiz = response.data.data;

    return {
      ...quiz,
      publishedAt: quiz.publishedAt?._seconds
        ? new Date(quiz.publishedAt._seconds * 1000)
        : new Date(),
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message || "Failed to fetch quiz");
  }
}

export async function fetchQuizzesByUser(
  userId: string,
  status?: string,
  limit?: number,
  offset?: number
): Promise<QuizPageResponse> {
  try {
    const params: Record<string, string | number> = { userId };
    if (status) params.status = status;
    if (limit !== undefined) params.limit = limit;
    if (offset !== undefined) params.offset = offset;

    const response = await apiClient.get("/getQuizzesByUserId", { params });

    if (response.data.success === false) {
      throw new Error(response.data.error || "Failed to fetch user quizzes");
    }

    const quizzes = response.data.data.map((quiz: any) => ({
      ...quiz,
      publishedAt: quiz.publishedAt?._seconds
        ? new Date(quiz.publishedAt._seconds * 1000)
        : new Date(),
    }));

    return {
      data: quizzes,
      pagination: response.data.pagination || {
        limit: limit || 100,
        offset: offset || 0,
        total: quizzes.length,
      },
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message || "Failed to fetch user quizzes");
  }
}

export async function createQuiz(data: QuizFormState & { status: Status }): Promise<UserQuiz> {
  try {
    const response = await apiClient.post("/createQuiz", data);

    if (response.data.success === false) {
      throw new Error(response.data.error || "Failed to create quiz");
    }

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message || "Failed to create quiz");
  }
}

export async function updateQuiz(
  quizId: string,
  data: Partial<QuizFormState & { status: Status }>
): Promise<UserQuiz> {
  try {
    const response = await apiClient.put("/updateQuiz", data, {
      params: { quizId },
    });

    if (response.data.success === false) {
      throw new Error(response.data.error || "Failed to update quiz");
    }

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message || "Failed to update quiz");
  }
}

export async function deleteQuiz(quizId: string): Promise<void> {
  try {
    const response = await apiClient.delete("/deleteQuiz", {
      params: { quizId },
    });

    if (response.data.success === false) {
      throw new Error(response.data.error || "Failed to delete quiz");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || error.message || "Failed to delete quiz");
  }
}

export async function evaluatePromptStream(
  onResult: (result: any) => void,
  onDone: (id: string, timestamp: number) => void,
  onError: (message: string) => void
): Promise<void> {
  const { auth } = await import("../firebase");
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("Not authenticated");

  const token = await currentUser.getIdToken();
  const baseURL = apiClient.defaults.baseURL ?? "/api";

  const response = await fetch(`${baseURL}/evaluatePrompt`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to run evaluation");
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data: ")) continue;
      const event = JSON.parse(line.slice(6));
      if (event.type === "result") onResult(event.data);
      else if (event.type === "done") onDone(event.id, event.timestamp);
      else if (event.type === "error") onError(event.message);
    }
  }
}
