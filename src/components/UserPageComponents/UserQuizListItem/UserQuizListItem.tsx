import Accordion from "react-bootstrap/Accordion";
import { UserLocalQuiz } from "../../../types/types";
import styles from "./UserQuizListItem.module.css";
import { useAuth } from "../../../context/AuthContext";
import DeleteQuizComponent from "../../DeleteQuizButton/DeleteQuizComponent";

export const UserQuizListItem = ({
  quiz,
  eventKey,
}: {
  quiz: UserLocalQuiz;
  eventKey: string;
}) => {
  const { title, authorId, authorName, publishedAt, ...rest } = quiz;
  const { currentUser } = useAuth();

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className="text-start position-relative">
        <small className={styles.itemSmalltext}>
          {`Published at: ${publishedAt.toLocaleDateString()}
          ${currentUser?.id === authorId ? "" : `by ${authorName}`}`}
        </small>
        {Object.entries(rest).map(([key, value]) => {
          return (
            <p key={key} className={styles.itemText}>
              {Array.isArray(value)
                ? "Amount of questions: " + value.length
                : `${key[0].toUpperCase() + key.slice(1)}: 
                ${value[0].toUpperCase() + value.slice(1)}`}
            </p>
          );
        })}
        {currentUser?.id === authorId && <DeleteQuizComponent />}
      </Accordion.Body>
    </Accordion.Item>
  );
};
