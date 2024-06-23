import Accordion from "react-bootstrap/Accordion";
import { UserQuiz } from "../../../types/types";
import styles from "./UserQuizListItem.module.css";
import { useAuth } from "../../../context/AuthContext";
import DeleteQuizComponent from "../../DeleteQuizButton/DeleteQuizComponent";

export const UserQuizListItem = ({
  quiz,
  eventKey,
}: {
  quiz: UserQuiz;
  eventKey: string;
}) => {
  const {
    title,
    description,
    questions,
    publishedAt,
    category,
    complexity,
    authorId,
  } = quiz;

  const { currentUser } = useAuth();

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className="text-start position-relative">
        <small className={styles.itemSmalltext}>
          Published at: {publishedAt.toLocaleDateString()}
        </small>
        <p className={styles.itemText}>Description: {description}</p>
        <p className={styles.itemText}>Category: {category}</p>
        <p className={styles.itemText}>Complexity: {complexity}</p>
        <p className={styles.itemText}>
          Amount of question: {questions.length}
        </p>
        {currentUser?.id === authorId && <DeleteQuizComponent />}
      </Accordion.Body>
    </Accordion.Item>
  );
};
