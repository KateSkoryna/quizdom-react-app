import { useQuizesStore } from "../../store/quizeStore";
import { useAuthStore } from "../../store/AuthStore";
import QuizMainListItem from "./quizItem/quizMainListItem";
import AddQuizCard from "./quizItem/addQuizCard";
import { Container, Card } from "react-bootstrap";
import styles from "../../styles/components/quizCard.module.scss";

const QuizMainList = () => {
  const quizes = useQuizesStore((state) => state.quizes);
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <Container className={styles.gridContainer}>
      {currentUser && <AddQuizCard />}
      {quizes.map((quiz) => (
        <Card key={quiz.id} className={styles.gridCard}>
          <QuizMainListItem quiz={quiz} />
        </Card>
      ))}
    </Container>
  );
};

export default QuizMainList;
