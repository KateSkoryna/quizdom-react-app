import { Card } from "react-bootstrap";
import styles from "../../../styles/components/quizCard.module.scss";
import QuizNoUserModal from "../../modal/quizNoUserModal";

type QuizCoverProps = {
  title: string;
  id: string;
  category: string;
};

const QuizCover = ({ title, id, category }: QuizCoverProps) => {
  return (
    <div className={styles.cover}>
      <QuizNoUserModal id={id} />
      <div className={styles.coverTitle}>{title}</div>
      <Card.Text className={styles.category}>{category}</Card.Text>
    </div>
  );
};

export default QuizCover;
