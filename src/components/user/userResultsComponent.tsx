import { useState, useEffect } from "react";
import { Accordion, Card, Container, Badge, Button } from "react-bootstrap";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import { useAuthStore } from "../../store/authStore";
import { useQueries } from "@tanstack/react-query";
import type { UserQuiz } from "../../types";
import Loader from "../common/loader";
import styles from "../../styles/components/userResults.module.scss";
import dayjs from "dayjs";
import StarRating from "../common/starRating";
import { fetchQuizById } from "../../fetchers/quiz-api";

const RESULTS_PER_PAGE = 6;

const UserResultsComponent = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const completionCache = useQuizCompletionStore((state) => state.completionCache);
  const loadAllCompletions = useQuizCompletionStore((state) => state.loadAllCompletions);
  const isLoadingCompletions = useQuizCompletionStore((state) => state.isLoading);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentUser) {
      loadAllCompletions();
    }
  }, [currentUser, loadAllCompletions]);

  // Get completed quizzes list
  const completedQuizzes = Object.entries(completionCache)
    .filter(([, completion]) => completion !== null)
    .map(([quizId, completion]) => ({ quizId, completion: completion! }))
    .sort((a, b) => {
      const dateA = a.completion.completedAt || new Date(0);
      const dateB = b.completion.completedAt || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

  // Pagination
  const total = completedQuizzes.length;
  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const paginatedQuizzes = completedQuizzes.slice(startIndex, endIndex);

  // Fetch quiz details only for current page with React Query
  const quizQueries = useQueries({
    queries: paginatedQuizzes.map(({ quizId }) => ({
      queryKey: ["quiz", quizId],
      queryFn: () => fetchQuizById(quizId),
      staleTime: 1000 * 60 * 5,
    })),
  });

  // Combine fetched quizzes into a dictionary
  const quizDetails: Record<string, UserQuiz> = quizQueries.reduce<Record<string, UserQuiz>>(
    (acc, query, idx) => {
      if (query.data) {
        acc[paginatedQuizzes[idx].quizId] = query.data;
      }
      return acc;
    },
    {}
  );

  const loadingQuizzes = quizQueries.some((q) => q.isLoading);

  // Show loader if completions or quizzes are loading
  if (isLoadingCompletions || loadingQuizzes) {
    return <Loader />;
  }

  if (completedQuizzes.length === 0) {
    return (
      <Container className={styles.emptyState}>
        <p>
          You haven&apos;t completed any quizzes yet. Start taking quizzes to see your results here!
        </p>
      </Container>
    );
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-0">
        <h4 className={styles.resultsTitle}>My Completed Quizzes ({total})</h4>
      </div>
      <div className="flex-grow-0">
        <Accordion>
          {paginatedQuizzes.map(({ quizId, completion }, index) => {
          const quiz = quizDetails[quizId];
          const correct = completion.score?.correctAnswers || 0;
          const total = completion.score?.totalQuestions || 0;
          const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
          const completedDate = completion.completedAt
            ? dayjs(completion.completedAt).format("DD/MM/YYYY HH:mm")
            : "Unknown date";

          return (
            <Accordion.Item eventKey={String(index)} key={quizId}>
              <Accordion.Header>
                <div className={styles.accordionHeader}>
                  <div className={styles.headerMain}>
                    <span className={styles.quizTitle}>{quiz?.title || "Loading..."}</span>
                    <span className={styles.completedDate}>{completedDate}</span>
                  </div>
                  <Badge
                    bg={percentage >= 70 ? "success" : percentage >= 50 ? "warning" : "danger"}
                    className={styles.scoreBadge}
                  >
                    {percentage}%
                  </Badge>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Card className={styles.resultCard}>
                  <Card.Body>
                    <div className={styles.resultGrid}>
                      <div className={styles.resultItem}>
                        <span className={styles.label}>Score:</span>
                        <span className={styles.value}>
                          {correct} / {total}
                        </span>
                      </div>
                      <div className={styles.resultItem}>
                        <span className={styles.label}>Percentage:</span>
                        <span className={styles.value}>{percentage}%</span>
                      </div>
                      {quiz && (
                        <>
                          <div className={styles.resultItem}>
                            <span className={styles.label}>Category:</span>
                            <span className={styles.value}>{quiz.category}</span>
                          </div>
                          <div className={styles.resultItem}>
                            <span className={styles.label}>Complexity:</span>
                            <span className={styles.value}>{quiz.complexity}</span>
                          </div>
                        </>
                      )}
                      {completion.rating && (
                        <div className={styles.resultItem}>
                          <span className={styles.label}>Your Rating:</span>
                          <span className={styles.value}>
                            <StarRating rating={completion.rating} size="medium" /> (
                            {completion.rating}/5)
                          </span>
                        </div>
                      )}
                      {completion.comment && (
                        <div className={`${styles.resultItem} ${styles.fullWidth}`}>
                          <span className={styles.label}>Your Comment:</span>
                          <span className={styles.value}>{completion.comment}</span>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-auto py-3">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          <span className="fw-semibold">
            {currentPage}/{totalPages}
          </span>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserResultsComponent;
