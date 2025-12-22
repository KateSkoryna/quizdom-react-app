import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
import styles from "../../../styles/components/quizCard.module.scss";
import { useState } from "react";

type LikeElementProps = {
  quizId: string;
  onAuthRequired: () => void;
  initialLiked?: boolean;
};

const LikeElement = ({ quizId, onAuthRequired, initialLiked = false }: LikeElementProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLikeClick = () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    setIsLiked(!isLiked);
    // TODO: Call backend API to toggle like
    // await toggleLike(quizId, !isLiked ? ACTION.ADD : ACTION.REMOVE);
  };

  return (
    <button
      onClick={handleLikeClick}
      className={styles.shareButton}
      aria-label="Like quiz"
      type="button"
    >
      {isLiked ? (
        <MdFavorite className={styles.shareIcon} style={{ color: '#f7941d' }} />
      ) : (
        <MdFavoriteBorder className={styles.shareIcon} />
      )}
    </button>
  );
};

export default LikeElement;
