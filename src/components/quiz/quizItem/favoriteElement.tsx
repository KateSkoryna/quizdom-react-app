import { useAuthStore } from "../../../store/authStore";
import { useFavoritesStore } from "../../../store/favoritesStore";
import { ACTION } from "../../../types/user";
import styles from "../../../styles/pages/home.module.scss";
import { MdStarOutline } from "react-icons/md";

type FavoriteElementProps = {
  quizId: string;
  onAuthRequired: () => void;
};

const FavoriteElement = ({ quizId, onAuthRequired }: FavoriteElementProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Derive checked state from currentUser
  const isChecked = currentUser?.favorites?.includes(quizId) || false;

  const handleFavoriteClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    const action = event.target.checked ? ACTION.ADD : ACTION.REMOVE;

    // Call backend API (apiCall handles loading/error states)
    await toggleFavorite(event.target.id, action);

    // Update local user state after successful API call
    const updatedFavorites =
      action === ACTION.ADD
        ? [...currentUser.favorites, event.target.id]
        : currentUser.favorites.filter((item: string) => item !== event.target.id);

    setCurrentUser({
      ...currentUser,
      favorites: updatedFavorites,
    });
  };

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
