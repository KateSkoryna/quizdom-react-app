import { useFavoritesStore } from "../../store/favoritesStore";
import UserFavoriteQuizList from "./userFavoriteQuizList";

const UserFavoritesComponent = () => {
  const { error } = useFavoritesStore();

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-0">
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <UserFavoriteQuizList />
    </div>
  );
};

export default UserFavoritesComponent;
