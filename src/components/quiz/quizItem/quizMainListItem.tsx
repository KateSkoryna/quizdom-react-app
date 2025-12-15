import Card from "react-bootstrap/Card";
import styles from "../../../styles/components/quizCard.module.scss";
import { UserQuiz } from "../../../../shared/src/types";
import { useAuthStore } from "../../../store/AuthStore";
import QuizCardBackside from "./QuizCardBackside";
import QuizStats from "./quizStats";
import QuizCover from "./quizCover";
import QuizLevelBadge from "./quizLevelBadge";
import { truncateString } from "../../../utils/truncateString";

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

  const cuttedTitle = truncateString(title, 50);
  const cuttedDescription = truncateString(description, 120);
  const localizedDate = publishedAt.toLocaleDateString();

  return (
    <Card className={styles.quizCardContent}>
      <div className={styles.front}>
        <QuizCover title={cuttedTitle} category={category} />
        <Card.Body className={styles.quizInfoCard}>
          <Card.Text className={styles.description}>{cuttedDescription}</Card.Text>

          <QuizLevelBadge complexity={complexity} />
          <QuizStats
            rating={rating}
            likesCount={likesCount}
            authorName={authorName}
            publishedAt={localizedDate}
            currentUser={!!currentUser}
          />
        </Card.Body>
      </div>

      <QuizCardBackside questions={questions} quizId={id!} />
    </Card>
  );
};

export default QuizMainListItem;
