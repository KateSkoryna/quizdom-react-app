import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { MdFavoriteBorder } from "react-icons/md";
import styles from "../../styles/pages/home.module.scss";
import { UserQuiz } from "../../types/types";
import { useEffect, useState } from "react";
import StartQuizModal from "./startQuizModal";
import { MdOutlineFavorite } from "react-icons/md";
import { useAuthStore } from "../../store/AuthStore";
import { toggleFavorites } from "../../API/api";
import { truncateString } from "../../helpers/truncateString";
import StartQuizButton from "./startQuizButton";
import NavigateUserModal from "../common/navigateUserModal";

type QuizMainListItemProps = {
  quiz: UserQuiz;
};

const QuizMainListItem = ({
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnd = () => setStartQuiz(false);
  const handleStart = () => setStartQuiz(true);
  const handleModalClose = () => setIsModalOpen(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const handleFavoriteClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!currentUser) {
      setIsModalOpen(true);
      return;
    }
    if (!event.target.checked) {
      await toggleFavorites(event.target.id, currentUser.id, "remove");
      setChecked(false);
      setCurrentUser({
        ...currentUser,
        favorites: currentUser.favorites.filter(
          (item: string) => item !== event.target.id
        ),
      });

      return;
    }
    await toggleFavorites(event.target.id, currentUser.id, "add");
    setChecked(true);
    setCurrentUser({
      ...currentUser,
      favorites: [...currentUser.favorites, event.target.id],
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
        <StartQuizButton handleModal={handleStart} />
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
      {isModalOpen && (
        <NavigateUserModal handleClose={handleModalClose} show={isModalOpen} />
      )}
    </Card.Body>
  );
};

export default QuizMainListItem;
