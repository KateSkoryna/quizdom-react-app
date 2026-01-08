import { Accordion, Card, Container, Badge } from "react-bootstrap";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import { useAuthStore } from "../../store/authStore";
import { useQueries } from "@tanstack/react-query";
import type { UserQuiz } from "../../types";
import Loader from "../common/loader";
import styles from "../../styles/components/userResults.module.scss";
import dayjs from "dayjs";
import StarRating from "../common/starRating";
import { fetchQuizById } from "../../fetchers/quiz-api";
import { useEffect } from "react";

const UserResultsComponent = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const completionCache = useQuizCompletionStore((state) => state.completionCache);
  const loadAllCompletions = useQuizCompletionStore((state) => state.loadAllCompletions);
  const isLoadingCompletions = useQuizCompletionStore((state) => state.isLoading);

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

  // Fetch all quiz details with React Query
  const quizQueries = useQueries({
    queries: completedQuizzes.map(({ quizId }) => ({
      queryKey: ["quiz", quizId],
      queryFn: () => fetchQuizById(quizId),
      staleTime: 1000 * 60 * 5,
    })),
  });

  // Combine fetched quizzes into a dictionary
  const quizDetails: Record<string, UserQuiz> = quizQueries.reduce<Record<string, UserQuiz>>(
    (acc, query, idx) => {
      if (query.data) {
        acc[completedQuizzes[idx].quizId] = query.data;
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

  return (
    <Container className={styles.resultsContainer}>
      <h4 className={styles.resultsTitle}>My Completed Quizzes ({completedQuizzes.length})</h4>
      <Accordion>
        {completedQuizzes.map(({ quizId, completion }, index) => {
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
    </Container>
  );
};

export default UserResultsComponent;
