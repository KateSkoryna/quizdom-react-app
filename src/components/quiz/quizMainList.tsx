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

  const categoryFilter = searchParams.get("category") || null;
  const complexityFilter = searchParams.get("complexity") || null;
  const quizzesPerPage = 10;

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuizzes(categoryFilter, complexityFilter, quizzesPerPage);

  const quizzes = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      loadAllCompletions();
      getFavorites();
      getLikes();
    }
  }, [currentUser, loadAllCompletions, getFavorites, getLikes]);

  const intersectionSentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [sentinelEntry] = entries;

      if (sentinelEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const sentinelElement = intersectionSentinelRef.current;
    if (!sentinelElement) return;

    const scrollContainer = sentinelElement.closest('[class*="scrollableSection"]') as HTMLElement;

    const observer = new IntersectionObserver(handleIntersection, {
      root: scrollContainer || null,
      rootMargin: "100px",
      threshold: 0.1,
    });

    observer.observe(sentinelElement);

    return () => observer.disconnect();
  }, [handleIntersection]);

  if (isLoading) return <Loader />;

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

      {hasNextPage && quizzes.length > 0 && (
        <div ref={intersectionSentinelRef} style={{ height: "20px", margin: "0.5rem 0" }} />
      )}

      {isFetchingNextPage && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Loader />
        </div>
      )}

      {!hasNextPage && quizzes.length === 0 && (
        <div style={{ textAlign: "center", padding: "1rem", color: "#666" }}>
          <p>No quizzes yet.</p>
        </div>
      )}
    </div>
  );
};

export default QuizMainList;
