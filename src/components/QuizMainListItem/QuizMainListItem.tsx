import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { MdFavoriteBorder } from "react-icons/md";
import styles from "./QuizMainListItem.module.css";
import { UserQuiz } from "../../types/types";
import { useEffect, useState } from "react";
import { getAuthorName } from "../../API/api";

type QuizMainListItemProps = {
  quiz: UserQuiz;
  handleFavoriteClick: (id: string) => void;
};

export const QuizMainListItem = ({
  quiz,
  handleFavoriteClick,
}: QuizMainListItemProps) => {
  const [authorName, setAuthorName] = useState<string>("");
  const { title, complexity, description, id, author, publishedAt } = quiz;

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
    <Card.Body className="position-relative">
      <Card.Title className={styles.titleContainer}>
        <h5>{title}</h5>
        <MdFavoriteBorder
          className={styles.favoriteIcon}
          onClick={() => handleFavoriteClick(id)}
        />
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{complexity}</Card.Subtitle>
      <Card.Text>{description}</Card.Text>
      <Card.Link as={Button}>Start Quiz</Card.Link>
      <Card.Link as={Button}>Share Quiz</Card.Link>
      <small className={styles.itemSmalltext}>
        Published at: {publishedAt.toLocaleDateString()} by {authorName}
      </small>
    </Card.Body>
  );
};
