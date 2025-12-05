import Card from "react-bootstrap/Card";
import styles from "../../../styles/components/quizCard.module.scss";
import { UserQuiz } from "../../../types/types";
import { truncateString } from "../../../helpers/truncateString";
import { useAuthStore } from "../../../store/AuthStore";
import StartQuizButton from "./startQuizButton";
import QuizStats from "./quizStats";
import QuizCover from "./quizCover";
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
        <QuizCover title={cuttedTitle} id={id} category={category} />
        <Card.Body className={styles.quizInfoCard}>
          <Card.Text className={styles.description}>
            {cuttedDescription}
          </Card.Text>

          <QuizLevelBadge complexity={complexity} />
          <QuizStats
            rating={rating}
            likesCount={likesCount}
            commentsCount={commentsCount}
            authorName={authorName}
            publishedAt={localizedDate}
            currentUser={!!currentUser}
          />
        </Card.Body>
      </div>
      <StartQuizButton questions={questions} />
    </Card>
  );
};

export default QuizMainListItem;
