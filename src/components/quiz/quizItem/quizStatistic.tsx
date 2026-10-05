import styles from "../../../styles/components/quizCard.module.scss";

const QuizStatistic = ({ score, scoreRate }: { score: string; scoreRate: string }) => {
  return (
    <div className={styles.completedInfo}>
      <span className={styles.completedLabel}>Your score</span>
      <strong className={styles.completedScore}>{score}</strong>
      <span className={styles.completedRate}>{scoreRate} correct</span>
    </div>
  );
};

export default QuizStatistic;
