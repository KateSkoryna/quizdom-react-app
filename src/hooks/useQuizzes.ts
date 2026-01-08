import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  fetchQuizzesByUser,
  fetchQuizById,
} from "../fetchers/quiz-api";
import { QuizFormState, UserQuiz } from "../types";
import { Status } from "../components/modal/quizModal";

export function useQuizzesByUser(status: Status, userId?: string) {
  return useQuery<UserQuiz[], Error>({
    queryKey: ["userQuizzes", userId, status],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required");
      return fetchQuizzesByUser(userId, status);
    },
    enabled: !!userId, // do not run until userId exists
    staleTime: 1000 * 60 * 5,
  });
}

export function useQuizById(quizId?: string) {
  return useQuery<UserQuiz, Error>({
    queryKey: ["quiz", quizId],
    queryFn: () => {
      if (!quizId) throw new Error("Quiz ID is required");
      return fetchQuizById(quizId);
    },
    enabled: !!quizId, // only run if quizId exists
    staleTime: 1000 * 60 * 5, // 5 minutes of freshness
  });
}

export function useAddQuiz() {
  const queryClient = useQueryClient();

  return useMutation<UserQuiz, Error, QuizFormState & { status: Status }>({
    mutationKey: ["quizzes", "add"], // optional, good for grouping / DevTools
    mutationFn: (data) => createQuiz(data),
    onSuccess: () => {
      // Refresh cache after adding a quiz
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["userQuizzes"] });
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation<
    UserQuiz,
    Error,
    { quizId: string; data: Partial<QuizFormState & { status: Status }> }
  >({
    mutationKey: ["quizzes", "update"],
    mutationFn: ({ quizId, data }) => updateQuiz(quizId, data),
    onSuccess: (updatedQuiz) => {
      queryClient.invalidateQueries({ queryKey: ["userQuizzes", updatedQuiz.authorId] });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation<
    void, // delete usually returns nothing
    Error, // error type
    string // quizId to delete
  >({
    mutationKey: ["quizzes", "delete"],
    mutationFn: (quizId: string) => deleteQuiz(quizId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["userQuizzes"] });
    },
  });
}
