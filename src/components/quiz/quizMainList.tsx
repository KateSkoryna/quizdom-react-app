import { useQuizStore } from "../../store/quizStore";
import { useAuthStore } from "../../store/authStore";
import QuizMainListItem from "./quizItem/quizMainListItem";
import AddQuizCard from "./quizItem/addQuizCard";
import { Container, Card } from "react-bootstrap";
import styles from "../../styles/components/quizCard.module.scss";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../common/loader";

const QuizMainList = () => {
  const quizzes = useQuizStore((state) => state.quizzes);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isLoading = useQuizStore((state) => state.isLoading);
  const [searchParams] = useSearchParams();
  const getQuizzes = useQuizStore((state) => state.getQuizzes);

  const searchCategory = searchParams.get("category") || null;
  const searchComplexity = searchParams.get("complexity") || null;

  useEffect(() => {
    const fetchQuizzes = async () => {
      await getQuizzes(searchCategory, searchComplexity);
    };
    fetchQuizzes();
  }, [searchCategory, searchComplexity, getQuizzes]);

  if (isLoading) return <Loader />;

  return (
    <Container className={styles.gridContainer}>
      {currentUser && <AddQuizCard />}
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className={styles.gridCard}>
          <QuizMainListItem quiz={quiz} />
        </Card>
      ))}
    </Container>
  );
};

export default QuizMainList;
