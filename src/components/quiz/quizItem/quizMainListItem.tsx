import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import styles from "../../../styles/components/quizCard.module.scss";
import { UserQuiz } from "../../../types";
import { useAuthStore } from "../../../store/authStore";
import { useQuizCompletionStore } from "../../../store/quizAttemptsStore";
import QuizCardBackside from "./quizCardBackside";
import QuizStats from "./quizStats";
import QuizCover from "./quizCover";
import QuizLevelBadge from "./quizLevelBadge";
import dayjs from "dayjs";

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
    likesCount = 0,
    category,
  },
}: QuizMainListItemProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const completionCache = useQuizCompletionStore((state) => state.completionCache);

  const localizedDate = dayjs(publishedAt).format("DD/MM/YYYY");

  const isCompleted = currentUser && id && !!completionCache[id];

  return (
    <Card className={styles.quizCardContent}>
      <div className={styles.front}>
        {isCompleted && (
          <Badge bg="success" className={styles.completedBadge}>
            ✓ Completed
          </Badge>
        )}
        <QuizCover title={title} category={category} />
        <Card.Body className={styles.quizInfoCard}>
          <Card.Text className={styles.description}>{description}</Card.Text>
          <QuizLevelBadge complexity={complexity} />
          <QuizStats
            rating={rating}
            authorName={authorName}
            publishedAt={localizedDate}
            currentUser={!!currentUser}
            questionsCount={questions.length}
            likesCount={likesCount}
          />
        </Card.Body>
      </div>
      {id && <QuizCardBackside questions={questions} quizId={id} />}
    </Card>
  );
};

export default QuizMainListItem;
