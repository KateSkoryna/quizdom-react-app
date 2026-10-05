import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { MdInsights } from "react-icons/md";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import { useAuthStore } from "../../store/authStore";
import { useQueries } from "@tanstack/react-query";
import type { UserQuiz } from "../../types";
import Loader from "../common/loader";
import styles from "../../styles/pages/profile.module.scss";
import dayjs from "dayjs";
import StarRating from "../common/starRating";
import { fetchQuizById } from "../../fetchers/quiz-api";
import { QUIZ_LEVEL_CONFIG } from "../../const/const";
import { PanelEmpty, PanelHeader, PanelPagination } from "./userPanel";

const getScoreClass = (percentage: number) => {
  if (percentage >= 70) return styles.scoreHigh;
  if (percentage >= 50) return styles.scoreMid;
  return styles.scoreLow;
};

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
      <>
        <PanelHeader title="Completed quizzes" subtitle="Your scores, ratings and comments" />
        <PanelEmpty icon={<MdInsights />}>
          You haven&apos;t completed any quizzes yet. Start taking quizzes to see your results here!
        </PanelEmpty>
      </>
    );
  }

  return (
    <>
      <PanelHeader
        title={`Completed quizzes (${total})`}
        subtitle="Your scores, ratings and comments"
      />
      <ul className={styles.list}>
        {paginatedQuizzes.map(({ quizId, completion }) => {
          const quiz = quizDetails[quizId];
          const correct = completion.score?.correctAnswers || 0;
          const questionsTotal = completion.score?.totalQuestions || 0;
          const percentage = questionsTotal > 0 ? Math.round((correct / questionsTotal) * 100) : 0;
          const completedDate = completion.completedAt
            ? dayjs(completion.completedAt).format("DD MMM YYYY, HH:mm")
            : "Unknown date";
          const level = quiz ? QUIZ_LEVEL_CONFIG[quiz.complexity] : undefined;
          const levelStyle = { "--level-color": level?.color } as CSSProperties;

          return (
            <li key={quizId} className={styles.resultRow} style={levelStyle}>
              <span className={styles.rowAccent} aria-hidden="true" />
              <div className={styles.rowMain}>
                <h3 className={styles.rowTitle}>{quiz?.title || "Loading..."}</h3>
                <div className={styles.meta}>
                  {quiz && <span className={styles.pill}>{quiz.category}</span>}
                  {level && (
                    <span className={styles.levelPill}>
                      <img src={level.icon} alt="" aria-hidden="true" />
                      {level.name}
                    </span>
                  )}
                  <span>Completed {completedDate}</span>
                </div>
                {(completion.rating || completion.comment) && (
                  <div className={styles.feedback}>
                    {completion.rating && (
                      <span>
                        Your rating: <StarRating rating={completion.rating} size="small" />{" "}
                        {completion.rating}/5
                      </span>
                    )}
                    {completion.comment && (
                      <p className={styles.feedbackComment}>“{completion.comment}”</p>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.scoreBlock}>
                <span className={`${styles.scoreBadge} ${getScoreClass(percentage)}`}>
                  {percentage}%
                </span>
                <div className={styles.scoreBar} aria-hidden="true">
                  <div className={styles.scoreBarFill} style={{ width: `${percentage}%` }} />
                </div>
                <span className={styles.scoreDetail}>
                  {correct}/{questionsTotal} correct
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <PanelPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </>
  );
};

export default UserResultsComponent;
