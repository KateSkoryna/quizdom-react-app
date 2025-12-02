import { useState, lazy, Suspense } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import styles from "../../styles/components/quizCard.module.scss";
import { UserQuiz } from "../../types/types";
import { truncateString } from "../../helpers/truncateString";
import { useAuthStore } from "../../store/AuthStore";
import Loader from "../common/loader";
import Intermediate from "../../assets/bishop.svg";
import Beginner from "../../assets/knight.svg";
import Expert from "../../assets/queen.svg";
import Advanced from "../../assets/rook.svg";
import HeartIcon from "../common/heartIcon";
import CommentIcon from "../common/commentIcon";

type QuizMainListItemProps = {
  quiz: UserQuiz;
};

// Lazy load modal
const StartQuizModal = lazy(() => import("../modal/startQuizModal"));
const QuizNoUserModal = lazy(() => import("../modal/quizNoUserModal"));

const LEVEL_CONFIG = {
  "1": { name: "Beginner", color: "#F7941D", icon: Beginner },
  "2": { name: "Intermediate", color: "#E8A83D", icon: Intermediate },
  "3": { name: "Advanced", color: "#5CB8E0", icon: Advanced },
  "4": { name: "Expert", color: "#27AAE1", icon: Expert },
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
    rating = 0,
    commentsCount = 0,
    likesCount = 0,
  },
}: QuizMainListItemProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [startQuiz, setStartQuiz] = useState(false);

  const cuttedTitle = truncateString(title, 50);
  const cuttedDescription = truncateString(description, 120);
  const localizedDate = publishedAt.toLocaleDateString();

  const displayAuthor = currentUser ? authorName : "Someone you know";
  const levelConfig = LEVEL_CONFIG[complexity] || LEVEL_CONFIG["1"];

  const handleStart = () => setStartQuiz(true);
  const handleEnd = () => setStartQuiz(false);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Card.Body className={styles.quizCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{cuttedTitle}</h3>
        <Suspense fallback={<Loader />}>
          <QuizNoUserModal id={id} />
        </Suspense>
      </div>

      {/* Description */}
      <Card.Text className={styles.description}>{cuttedDescription}</Card.Text>

      {/* Level */}
      <div className={styles.levelInfo}>
        <p
          className={styles.complexity}
          style={{ color: levelConfig?.color || "#000" }}
        >
          <img
            src={levelConfig?.icon}
            alt={`Level ${complexity}`}
            className={styles.levelIcon}
          />
          {levelConfig?.name || complexity}
        </p>
      </div>

      {/* Start Button */}
      <div className={styles.cardFooter}>
        <Button
          onClick={handleStart}
          className={styles.startButton}
          disabled={!currentUser}
        >
          Start Quiz
        </Button>
      </div>

      {/* Stats and Published Info */}
      <div className={styles.cardMeta}>
        <div className={styles.publishedInfo}>
          <p
            className={styles.author}
          >{`Published by ${displayAuthor} • ${localizedDate}`}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.rating}>
              {renderStars(Math.round(rating))}
            </span>
            {rating > 0 && (
              <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            )}
          </div>
          <div className={styles.statItem}>
            <HeartIcon className={styles.statIcon} />
            <span className={styles.statValue}>{likesCount}</span>
          </div>
          <div className={styles.statItem}>
            <CommentIcon className={styles.statIcon} />
            <span className={styles.statValue}>{commentsCount}</span>
          </div>
        </div>
      </div>
      {startQuiz && (
        <Suspense fallback={<Loader />}>
          <StartQuizModal
            show={startQuiz}
            handleClose={handleEnd}
            questions={questions}
          />
        </Suspense>
      )}
    </Card.Body>
  );
};

export default QuizMainListItem;
