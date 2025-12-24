import { Accordion } from "react-bootstrap";
import UserQuizListItem from "./userQuizItem";
import Loader from "../common/loader";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useFavoritesStore } from "../../store/favoritesStore";

const UserFavoriteQuizList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { favorites, isLoading, getFavorites } = useFavoritesStore();

  useEffect(() => {
    if (currentUser) {
      getFavorites();
    }
  }, [currentUser, getFavorites]);

  return isLoading ? (
    <Loader />
  ) : (
    <Accordion defaultActiveKey="0" flush>
      {favorites && favorites.length > 0 ? (
        favorites.map((quiz, index) => {
          return <UserQuizListItem key={quiz.id} quiz={quiz} eventKey={index.toString()} />;
        })
      ) : (
        <p>No quizzes yet</p>
      )}
    </Accordion>
  );
};

export default UserFavoriteQuizList;
