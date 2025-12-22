import { useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/authStore";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import StarRating from "../common/starRating";
import styles from "../../styles/components/userQuiz.module.scss";

function StarComponent() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const completionCache = useQuizCompletionStore((state) => state.completionCache);
  const loadAllCompletions = useQuizCompletionStore((state) => state.loadAllCompletions);

  useEffect(() => {
    if (currentUser) {
      loadAllCompletions();
    }
  }, [currentUser, loadAllCompletions]);

  // Calculate statistics from all completed quizzes
  const statistics = useMemo(() => {
    const completedQuizzes = Object.values(completionCache).filter(
      (completion) => completion !== null && completion.score
    );

    const totalQuizzes = completedQuizzes.length;

    if (totalQuizzes === 0) {
      return {
        totalQuizzes: 0,
        averagePercentage: 0,
        rating: 0,
      };
    }

    // Calculate average percentage across all quizzes
    const totalPercentage = completedQuizzes.reduce((sum, completion) => {
      const { correctAnswers, totalQuestions } = completion!.score;
      const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      return sum + percentage;
    }, 0);

    const averagePercentage = totalPercentage / totalQuizzes;

    // Convert to 1-10 scale
    const rating = (averagePercentage / 100) * 10;

    return {
      totalQuizzes,
      averagePercentage: Math.round(averagePercentage),
      rating: Number(rating.toFixed(2)), // Keep 2 decimal places for accuracy
    };
  }, [completionCache]);

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.statRow}>
        <span className={styles.statLabel}>Total Passed:</span>
        <span className={styles.statValue}>{statistics.totalQuizzes} quizzes</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.statLabel}>Average Performance:</span>
        <span className={styles.statValue}>{statistics.averagePercentage}%</span>
      </div>
      <div className={styles.ratingRow}>
        <span className={styles.ratingLabel}>Rating: {statistics.rating.toFixed(1)}/10</span>
      </div>
      <div className={styles.starsRow}>
        <StarRating rating={statistics.rating} maxStars={10} size="medium" />
      </div>
    </div>
  );
}

export default StarComponent;
