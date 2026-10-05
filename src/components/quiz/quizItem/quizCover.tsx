import { MdCheckCircle } from "react-icons/md";
import styles from "../../../styles/components/quizCard.module.scss";

type QuizCoverProps = {
  title: string;
  category: string;
  isCompleted?: boolean;
};

const QuizCover = ({ title, category, isCompleted = false }: QuizCoverProps) => {
  return (
    <div className={styles.cover}>
      <div className={styles.coverTop}>
        <span className={styles.category}>{category}</span>
        {isCompleted && (
          <span className={styles.completedBadge}>
            <MdCheckCircle aria-hidden="true" />
            Completed
          </span>
        )}
      </div>
      <h3 className={styles.coverTitle}>{title}</h3>
    </div>
  );
};

export default QuizCover;
