import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { MdFavoriteBorder } from "react-icons/md";
import styles from "./QuizMainListItem.module.css";
import { CurrentUser, UserQuiz } from "../../../types/types";
import { useEffect, useState } from "react";
import { StartQuizModal } from "../StartQuizModal/StartQuizModal";
import { MdOutlineFavorite } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import { toggleFavorites } from "../../../API/api";
import { truncateString } from "../../../helpers/truncateString";

type QuizMainListItemProps = {
  quiz: UserQuiz;
};

export const QuizMainListItem = ({
  quiz: {
    title,
    complexity,
    description,
    id,
    authorName,
    publishedAt,
    questions,
  },
}: QuizMainListItemProps) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleEnd = () => setStartQuiz(false);
  const handleStart = () => setStartQuiz(true);

  const { currentUser, setCurrentUser } = useAuth();
  const handleFavoriteClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!currentUser) {
      return;
    }
    if (!event.target.checked) {
      await toggleFavorites(event.target.id, currentUser.id, "remove");
      setChecked(false);
      setCurrentUser((prev) => {
        return {
          ...((prev as CurrentUser) ?? {}),
          favorites: currentUser.favorites.filter(
            (item: string) => item !== event.target.id
          ),
        };
      });

      return;
    }
    await toggleFavorites(event.target.id, currentUser.id, "add");
    setChecked(true);
    setCurrentUser((prev) => {
      return {
        ...((prev as CurrentUser) ?? {}),
        favorites: [...currentUser.favorites, event.target.id],
      };
    });
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.favorites.includes(id)) {
        setChecked(true);
      }
    }
  }, []);

  return (
    <Card.Body className={styles.cardBody}>
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
      <Card.Title>{truncateString(title, 40)}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{complexity}</Card.Subtitle>
      <Card.Text className={styles.quizDescription}>
        {truncateString(description, 80)}
      </Card.Text>
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
