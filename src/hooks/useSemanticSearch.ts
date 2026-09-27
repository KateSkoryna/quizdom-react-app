import { useQuery } from "@tanstack/react-query";
import { searchQuizzes } from "../fetchers/quiz-api";

/**
 * Natural-language quiz search; disabled until there is a query
 */
export function useSemanticSearch(q: string, category?: string | null, complexity?: string | null) {
  return useQuery({
    queryKey: ["quizzes", "search", { q, category, complexity }],
    queryFn: () => searchQuizzes({ q, category, complexity }),
    enabled: q.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
