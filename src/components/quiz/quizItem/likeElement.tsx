import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
import { useLikesStore } from "../../../store/likesStore";
import { ACTION } from "../../../types/user";
import styles from "../../../styles/components/quizCard.module.scss";

type LikeElementProps = {
  quizId: string;
  onAuthRequired: () => void;
};

const LikeElement = ({ quizId, onAuthRequired }: LikeElementProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const toggleLike = useLikesStore((state) => state.toggleLike);
  const isLiked = useLikesStore((state) => state.isLiked);

  // Check if quiz is liked from likes store
  const liked = isLiked(quizId);

  const handleLikeClick = async () => {
    if (!currentUser) {
      onAuthRequired();
      return;
    }

    const action = liked ? ACTION.REMOVE : ACTION.ADD;
    await toggleLike(quizId, action);
  };

  return (
    <button
      onClick={handleLikeClick}
      className={styles.shareButton}
      aria-label="Like quiz"
      type="button"
    >
      {liked ? (
        <MdFavorite className={styles.shareIcon} style={{ color: "#f7941d" }} />
      ) : (
        <MdFavoriteBorder className={styles.shareIcon} />
      )}
    </button>
  );
};

export default LikeElement;
