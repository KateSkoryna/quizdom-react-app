import { useFavoritesStore } from "../../store/favoritesStore";
import UserFavoriteQuizList from "./userFavoriteQuizList";

const UserFavoritesComponent = () => {
  const { error } = useFavoritesStore();

  return (
    <div className="pt-3 text-center">
      <h5 className="mb-3">User Favorites</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <UserFavoriteQuizList />
    </div>
  );
};

export default UserFavoritesComponent;
