import { Accordion, Container } from "react-bootstrap";
import UserQuizListItem from "./userQuizItem";
import Loader from "../common/loader";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import styles from "../../styles/components/userResults.module.scss";

const UserFavoriteQuizList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { favorites, isLoading, getFavorites } = useFavoritesStore();

  useEffect(() => {
    if (currentUser) {
      getFavorites();
    }
  }, [currentUser, getFavorites]);

  if (isLoading) {
    return <Loader />;
  }

  if (favorites && favorites.length > 0) {
    return (
      <Accordion defaultActiveKey="0" flush>
        {favorites.map((quiz, index) => {
          return <UserQuizListItem key={quiz.id} quiz={quiz} eventKey={index.toString()} />;
        })}
      </Accordion>
    );
  }

  return (
    <Container className={styles.emptyState}>
      <p>You haven&apos;t favorited any quizzes yet. Explore quizzes and add them to your favorites!</p>
    </Container>
  );
};

export default UserFavoriteQuizList;
