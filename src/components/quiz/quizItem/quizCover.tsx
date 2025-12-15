import { Card } from "react-bootstrap";
import styles from "../../../styles/components/quizCard.module.scss";

type QuizCoverProps = {
  title: string;
  category: string;
};

const QuizCover = ({ title, category }: QuizCoverProps) => {
  return (
    <div className={styles.cover}>
      <div className={styles.coverTitle}>{title}</div>
      <Card.Text className={styles.category}>{category}</Card.Text>
    </div>
  );
};

export default QuizCover;
