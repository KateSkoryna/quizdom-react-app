import { useFavoritesStore } from "../../store/favoritesStore";
import UserFavoriteQuizList from "./userFavoriteQuizList";
import { PanelHeader } from "./userPanel";

const UserFavoritesComponent = () => {
  const { error } = useFavoritesStore();

  return (
    <>
      <PanelHeader title="Favorites" subtitle="Quizzes you starred to come back to" />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <UserFavoriteQuizList />
    </>
  );
};

export default UserFavoritesComponent;
