import { useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/authStore";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import styles from "../../styles/pages/profile.module.scss";

const MAX_RATING = 10;

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
    const rating = (averagePercentage / 100) * MAX_RATING;

    return {
      totalQuizzes,
      averagePercentage: Math.round(averagePercentage),
      rating: Number(rating.toFixed(2)), // Keep 2 decimal places for accuracy
    };
  }, [completionCache]);

  return (
    <section className={styles.stats} aria-label="Your statistics">
      <div className={styles.statTiles}>
        <div className={styles.statTile}>
          <span className={styles.statValue}>{statistics.totalQuizzes}</span>
          <span className={styles.statLabel}>Quizzes passed</span>
        </div>
        <div className={styles.statTile}>
          <span className={styles.statValue}>{statistics.averagePercentage}%</span>
          <span className={styles.statLabel}>Average score</span>
        </div>
      </div>
      <div className={styles.ratingMeter}>
        <div className={styles.ratingHeader}>
          <span>Quizdom rating</span>
          <strong>
            {statistics.rating.toFixed(1)}/{MAX_RATING}
          </strong>
        </div>
        <div
          className={styles.meterTrack}
          role="meter"
          aria-label="Quizdom rating"
          aria-valuemin={0}
          aria-valuemax={MAX_RATING}
          aria-valuenow={statistics.rating}
        >
          <div
            className={styles.meterFill}
            style={{ width: `${(statistics.rating / MAX_RATING) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default StarComponent;
