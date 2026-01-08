import { useAuthStore } from "../../store/authStore";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { useLikesStore } from "../../store/likesStore";
import QuizMainListItem from "./quizItem/quizMainListItem";
import AddQuizCard from "./quizItem/addQuizCard";
import { Card } from "react-bootstrap";
import styles from "../../styles/components/quizCard.module.scss";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../common/loader";
import { useInfiniteQuizzes } from "../../hooks/useInfiniteQuizzes";

const QuizMainList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [searchParams] = useSearchParams();
  const loadAllCompletions = useQuizCompletionStore((state) => state.loadAllCompletions);
  const getFavorites = useFavoritesStore((state) => state.getFavorites);
  const getLikes = useLikesStore((state) => state.getLikes);

  const searchCategory = searchParams.get("category") || null;
  const searchComplexity = searchParams.get("complexity") || null;

  // Use the infinite query hook
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuizzes(searchCategory, searchComplexity, 10);

  // Flatten all pages into a single array of quizzes
  // useMemo prevents recalculation on every render
  const quizzes = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  // Load user-specific data on mount
  useEffect(() => {
    if (currentUser) {
      loadAllCompletions();
      getFavorites();
      getLikes();
    }
  }, [currentUser, loadAllCompletions, getFavorites, getLikes]);

  // Ref for the sentinel element (the element we'll observe)
  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer callback
  // useCallback ensures the function reference stays stable
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      // If the sentinel is visible and we have more pages
      // and we're not already fetching, load the next page
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Set up the Intersection Observer
  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    // Create observer with options
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Use viewport as root
      rootMargin: "100px", // Start loading 100px before the element is visible
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    observer.observe(element);

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, [handleObserver]);

  // Handle loading state
  if (isLoading) return <Loader />;

  // Handle error state - throw error to be caught by ErrorBoundary
  if (isError) {
    throw error;
  }

  return (
    <div>
      <div className={styles.gridWrapper}>
        {currentUser && <AddQuizCard />}

        {quizzes.length > 0 && (
          <ul className={styles.gridContainer}>
            {quizzes.map((quiz) => (
              <li key={quiz.id} className={styles.gridItem}>
                <Card className={styles.gridCard}>
                  <QuizMainListItem quiz={quiz} />
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sentinel element for infinite scroll */}
      {/* This invisible element triggers loading when scrolled into view */}
      {hasNextPage && quizzes.length > 0 && (
        <div ref={observerTarget} style={{ height: "20px", margin: "0.5rem 0" }} />
      )}

      {/* Loading indicator when fetching next page */}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Loader />
        </div>
      )}

      {/* Show message when no quizzes found */}
      {!hasNextPage && quizzes.length === 0 && (
        <div style={{ textAlign: "center", padding: "1rem", color: "#666" }}>
          <p>No quizzes yet.</p>
        </div>
      )}
    </div>
  );
};

export default QuizMainList;
