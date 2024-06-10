import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { MdFavoriteBorder } from "react-icons/md";
import styles from "./QuizMainListItem.module.css";
import { UserQuiz } from "../../types/types";
import { useEffect, useState } from "react";
import { getAuthorName } from "../../API/api";
import { StartQuizModal } from "../StartQuizModal/StartQuizModal";
import { MdOutlineFavorite } from "react-icons/md";

type QuizMainListItemProps = {
  quiz: UserQuiz;
  handleFavoriteClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

export const QuizMainListItem = ({
  quiz,
  handleFavoriteClick,
  checked,
}: QuizMainListItemProps) => {
  const [authorName, setAuthorName] = useState<string>("");
  const [startQuiz, setStartQuiz] = useState(false);

  const handleEnd = () => setStartQuiz(false);
  const handleStart = () => setStartQuiz(true);

  const { title, complexity, description, id, author, publishedAt, questions } =
    quiz;

  useEffect(() => {
    const getUserById = async () => {
      try {
        const authorFetchName = await getAuthorName(author);
        setAuthorName(authorFetchName);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };
    getUserById();
  }, []);

  return (
    <Card.Body className={styles.cardBody}>
      <Card.Title className={styles.titleContainer}>
        <h5>{title}</h5>
        <div className={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => handleFavoriteClick(e)}
              id={id}
            />
            {checked ? (
              <MdOutlineFavorite
                className={styles.favoriteIcon}
                style={{ fill: "#F7941D" }}
              />
            ) : (
              <MdFavoriteBorder
                className={styles.favoriteIcon}
                style={{ fill: "gray" }}
              />
            )}
          </label>
        </div>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{complexity}</Card.Subtitle>
      <Card.Text className={styles.quizDescription}>{description}</Card.Text>
      <div className={styles.buttonContainer}>
        <Card.Link onClick={handleStart} as={Button}>
          Start Quiz
        </Card.Link>
        <Card.Link as={Button}>Share Quiz</Card.Link>
      </div>
      <small className={styles.itemSmalltext}>
        Published on: {publishedAt.toLocaleDateString()} by {authorName}
      </small>
      {startQuiz && (
        <StartQuizModal
          show={startQuiz}
          handleClose={handleEnd}
          questions={questions}
        />
      )}
    </Card.Body>
  );
};
