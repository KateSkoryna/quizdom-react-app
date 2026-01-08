import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchQuizzes, FetchQuizzesParams, fetchQuizById } from "../fetchers/quiz-api";

/**
 * Custom hook for infinite scrolling quiz list
 *
 * @param category - Optional category filter
 * @param complexity - Optional complexity filter
 * @param pageSize - Number of quizzes to load per page (default: 20)
 *
 * @returns TanStack Query infinite query result with quiz pages
 *
 * Key properties returned:
 * - data: All pages of quizzes (data.pages[])
 * - fetchNextPage: Function to load the next page
 * - hasNextPage: Boolean indicating if more pages exist
 * - isFetchingNextPage: Boolean for loading state of next page
 * - isLoading: Boolean for initial loading state
 * - isError: Boolean for error state
 * - error: Error object if request failed
 */
export function useInfiniteQuizzes(
  category?: string | null,
  complexity?: string | null,
  pageSize: number = 20
) {
  return useInfiniteQuery({
    // Query key: unique identifier for this query
    // TanStack Query uses this for caching and refetching
    // When category/complexity changes, it's treated as a new query
    queryKey: ["quizzes", "infinite", { category, complexity }],

    // Query function: called for each page
    // pageParam starts at 0 (initial page) and increments
    queryFn: async ({ pageParam = 0 }) => {
      const params: FetchQuizzesParams = {
        category,
        complexity,
        limit: pageSize,
        offset: pageParam * pageSize, // Calculate offset from page number
      };

      return fetchQuizzes(params);
    },

    // Determines the next page parameter
    // Called after each successful fetch
    // Return undefined when there's no next page
    getNextPageParam: (lastPage, allPages) => {
      // If we received fewer items than requested, we've reached the end
      if (lastPage.data.length < pageSize) {
        return undefined;
      }

      // Return the next page number
      return allPages.length;
    },

    // Initial page parameter (starts at page 0)
    initialPageParam: 0,

    // Keep previous data while fetching new data
    // This prevents flickering when filters change
    placeholderData: (previousData) => previousData,

    // Stale time: data is fresh for 5 minutes
    staleTime: 1000 * 60 * 5,
  });
}

export function useQuiz(quizId: string) {
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => fetchQuizById(quizId),
    enabled: !!quizId, // only fetch if quizId exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
