import { useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { useFavoritesStore } from "../../store/FavoritesStore";
import UserQuizList from "./userQuizList";

const UserFavoritesComponent = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { favorites, isLoading, error, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    if (currentUser?.favorites) {
      fetchFavorites(currentUser.favorites);
    }
  }, [currentUser, fetchFavorites]);

  return (
    <div className="pt-3 text-center">
      <h5 className="mb-3">User Favorites</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <UserQuizList quizes={favorites} isLoading={isLoading} />
    </div>
  );
};

export default UserFavoritesComponent;
