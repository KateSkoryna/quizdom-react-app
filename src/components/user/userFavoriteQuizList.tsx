import { Accordion } from "react-bootstrap";
import UserQuizListItem from "./userQuizItem";
import Loader from "../common/loader";
import { useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { useFavoritesStore } from "../../store/FavoritesStore";

const UserFavoriteQuizList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { favorites, isLoading, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    if (currentUser?.favorites) {
      fetchFavorites(currentUser.favorites);
    }
  }, [currentUser, fetchFavorites]);

  return isLoading ? (
    <Loader />
  ) : (
    <Accordion defaultActiveKey="0" flush>
      {favorites ? (
        favorites.map((quiz, index) => {
          const { id, ...rest } = quiz;
          return (
            <UserQuizListItem
              key={id}
              quiz={rest}
              eventKey={index.toString()}
            />
          );
        })
      ) : (
        <p>No quizes yet</p>
      )}
    </Accordion>
  );
};

export default UserFavoriteQuizList;
