import Card from "react-bootstrap/Card";
import styles from "../../../styles/components/quizCard.module.scss";
import { UserQuiz } from "../../../types/types";
import { truncateString } from "../../../helpers/truncateString";
import { useAuthStore } from "../../../store/AuthStore";
import StartQuizButton from "./startQuizButton";
import QuizCardHeader from "./quizCardHeader";
import QuizStats from "./quizStats";
import QuizLevelBadge from "./quizLevelBadge";

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
    rating = 0,
    commentsCount = 0,
    likesCount = 0,
  },
}: QuizMainListItemProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const cuttedTitle = truncateString(title, 50);
  const cuttedDescription = truncateString(description, 120);
  const localizedDate = publishedAt.toLocaleDateString();

  return (
    <Card.Body className={styles.quizCard}>
      <QuizCardHeader title={cuttedTitle} id={id} />

      <Card.Text className={styles.description}>{cuttedDescription}</Card.Text>

      <QuizLevelBadge complexity={complexity} />

      <StartQuizButton questions={questions} />

      <div className={styles.cardFooter}>
        <QuizStats
          rating={rating}
          likesCount={likesCount}
          commentsCount={commentsCount}
          authorName={authorName}
          publishedAt={localizedDate}
          currentUser={!!currentUser}
        />
      </div>
    </Card.Body>
  );
};

export default QuizMainListItem;
