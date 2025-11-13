import Card from "react-bootstrap/Card";
import styles from "../../styles/pages/home.module.scss";
import { UserQuiz } from "../../types/types";
import { truncateString } from "../../helpers/truncateString";
import QuizNoUserModal from "./quizNoUserModal";
import StartQuizContainer from "./startQuizContainer";

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
  const cuttedTitle = truncateString(title, 40);
  const cuttedDescription = truncateString(description, 80);
  const localizedDate = publishedAt.toLocaleDateString();
  return (
    <Card.Body className={styles.cardBody}>
      <QuizNoUserModal id={id} />
      <Card.Title>{cuttedTitle}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{complexity}</Card.Subtitle>
      <Card.Text className={styles.quizDescription}>
        {cuttedDescription}
      </Card.Text>
      <StartQuizContainer questions={questions} />
      <small className={styles.itemSmalltext}>
        Published on: {localizedDate} by {authorName}
      </small>
    </Card.Body>
  );
};

export default QuizMainListItem;
