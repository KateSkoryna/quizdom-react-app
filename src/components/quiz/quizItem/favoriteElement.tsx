import { useFavoritesStore } from "../../../store/favoritesStore";
import { ACTION } from "../../../types/user";
import styles from "../../../styles/pages/home.module.scss";
import { MdStarOutline } from "react-icons/md";
import { ToggleAction } from "../toggleAction";

type FavoriteElementProps = {
  quizId: string;
  onAuthRequired: () => void;
};

const FavoriteElement = ({ quizId, onAuthRequired }: FavoriteElementProps) => {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isChecked = useFavoritesStore((state) => state.favoriteIds.includes(quizId));

  const handleToggle = async (action: "ADD" | "REMOVE") => {
    const actionEnum = action === "ADD" ? ACTION.ADD : ACTION.REMOVE;
    await toggleFavorite(quizId, actionEnum);
  };

  return (
    <ToggleAction
      isChecked={isChecked}
      onToggle={handleToggle}
      onAuthRequired={onAuthRequired}
      icon={<MdStarOutline />}
      inputId={quizId}
      className={styles.checkbox}
      ariaLabel="Favorite quiz"
    />
  );
};

export default FavoriteElement;
