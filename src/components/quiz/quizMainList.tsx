import { useQuizesStore } from "../../store/quizeStore";
import QuizMainListItem from "./quizItem/quizMainListItem";
import { Container, Card } from "react-bootstrap";
import styles from "../../styles/components/quizCard.module.scss";

const QuizMainList = () => {
  const quizes = useQuizesStore((state) => state.quizes);
  return (
    <Container className={styles.gridContainer}>
      {quizes.map((quiz) => (
        <Card key={quiz.id} className={styles.gridCard}>
          <QuizMainListItem quiz={quiz} />
        </Card>
      ))}
    </Container>
  );
};

export default QuizMainList;
