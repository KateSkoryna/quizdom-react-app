import { useAuthStore } from "../../../store/authStore";
import { useFavoritesStore } from "../../../store/favoritesStore";
import { ACTION } from "../../../types/user";
import styles from "../../../styles/pages/home.module.scss";
import { MdStarOutline } from "react-icons/md";
import Loader from "../../common/loader";

type FavoriteElementProps = {
  quizId: string;
  onAuthRequired: () => void;
};

const FavoriteElement = ({ quizId, onAuthRequired }: FavoriteElementProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isLoading = useFavoritesStore((s) => s.isLoading);
  const isChecked = useFavoritesStore((state) => state.favoriteIds.includes(quizId));

  const handleFavoriteClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    const action = event.target.checked ? ACTION.ADD : ACTION.REMOVE;

    await toggleFavorite(quizId, action);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.checkbox}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleFavoriteClick(e)}
          id={quizId}
        />
        <MdStarOutline className={styles.favoriteIcon} />
      </label>
    </div>
  );
};

export default FavoriteElement;
