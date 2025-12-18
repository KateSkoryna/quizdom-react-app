import Accordion from "react-bootstrap/Accordion";
import { QuizMetadata } from "../../types";
import styles from "../../styles/components/userQuiz.module.scss";
import { useAuthStore } from "../../store/AuthStore";
import DeleteQuizComponent from "../quiz/deleteQuizComponent";

const UserQuizItem = ({ quiz, eventKey }: { quiz: QuizMetadata; eventKey: string }) => {
  const {
    title,
    authorId,
    authorName,
    publishedAt,
    ratingsCount: _ratingCount,
    likesCount: _likesCount,
    status: _status,
    ...rest
  } = quiz;
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body className="text-start position-relative">
        {currentUser?.id === authorId && <DeleteQuizComponent />}

        {Object.entries(rest).map(([key, value]) => {
          let displayValue;

          if (Array.isArray(value)) {
            displayValue = value.length;
          } else if (typeof value === "string") {
            displayValue = value[0].toUpperCase() + value.slice(1);
          } else {
            displayValue = String(value); // handles numbers like ratingsCount
          }

          return (
            <p key={key} className={styles.itemText}>
              {key[0].toUpperCase() + key.slice(1)}: {displayValue}
            </p>
          );
        })}

        <small className={styles.itemSmalltext}>
          {`Published at: ${publishedAt.toLocaleDateString()}${
            currentUser?.id === authorId ? "" : ` by ${authorName}`
          }`}
        </small>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default UserQuizItem;
