import styles from "../../../styles/components/quizCard.module.scss";

const QuizStatistic = ({ score, scoreRate }: { score: string; scoreRate: string }) => {
  return (
    <div className={styles.completedInfo}>
      <p>The quiz is already completed!</p>
      <p>Your score is: {score}</p>
      <p>Success: {scoreRate}</p>
    </div>
  );
};

export default QuizStatistic;
