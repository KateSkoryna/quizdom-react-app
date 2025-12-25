import { useQuizStore } from "../../store/quizStore";
import { useAuthStore } from "../../store/authStore";
import { useQuizCompletionStore } from "../../store/quizAttemptsStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { useLikesStore } from "../../store/likesStore";
import QuizMainListItem from "./quizItem/quizMainListItem";
import AddQuizCard from "./quizItem/addQuizCard";
import { Card } from "react-bootstrap";
import styles from "../../styles/components/quizCard.module.scss";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../common/loader";

const QuizMainList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isLoading = useQuizStore((state) => state.isLoading);
  const [searchParams] = useSearchParams();
  const getQuizzes = useQuizStore((state) => state.getQuizzes);
  const getPublishedQuizzes = useQuizStore((state) => state.getPublishedQuizzes);
  const loadAllCompletions = useQuizCompletionStore((state) => state.loadAllCompletions);
  const getFavorites = useFavoritesStore((state) => state.getFavorites);
  const getLikes = useLikesStore((state) => state.getLikes);

  const searchCategory = searchParams.get("category") || null;
  const searchComplexity = searchParams.get("complexity") || null;

  // Get published quizzes using selector
  const quizzes = getPublishedQuizzes(searchCategory, searchComplexity);

  useEffect(() => {
    const fetchQuizzes = async () => {
      await getQuizzes(searchCategory, searchComplexity);
    };
    fetchQuizzes();
  }, [searchCategory, searchComplexity, getQuizzes]);

  useEffect(() => {
    if (currentUser) {
      loadAllCompletions();
      getFavorites();
      getLikes();
    }
  }, [currentUser, loadAllCompletions, getFavorites, getLikes]);

  if (isLoading) return <Loader />;

  return (
    <ul className={styles.gridContainer}>
      {currentUser && (
        <li className={styles.gridItem}>
          <AddQuizCard />
        </li>
      )}
      {quizzes.map((quiz) => (
        <li key={quiz.id} className={styles.gridItem}>
          <Card className={styles.gridCard}>
            <QuizMainListItem quiz={quiz} />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default QuizMainList;
