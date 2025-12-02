import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/home.module.scss";
import { toggleFavorites } from "../../fetchers/api";
import FavoriteIcon from "../common/favoriteIcon";

type FavoriteElementProps = {
  quizId: string;
  onAuthRequired: () => void;
};

const FavoriteElement = ({ quizId, onAuthRequired }: FavoriteElementProps) => {
  const [checked, setChecked] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const handleFavoriteClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    if (!event.target.checked) {
      await toggleFavorites(event.target.id, currentUser.id, "remove");
      setChecked(false);
      setCurrentUser({
        ...currentUser,
        favorites: currentUser.favorites.filter(
          (item: string) => item !== event.target.id
        ),
      });
      return;
    }

    await toggleFavorites(event.target.id, currentUser.id, "add");
    setChecked(true);
    setCurrentUser({
      ...currentUser,
      favorites: [...currentUser.favorites, event.target.id],
    });
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.favorites.includes(quizId)) {
        setChecked(true);
      }
    }
  }, [currentUser, quizId]);

  return (
    <div className={styles.checkbox}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleFavoriteClick(e)}
          id={quizId}
        />
        <FavoriteIcon className={styles.favoriteIcon} />
      </label>
    </div>
  );
};

export default FavoriteElement;
