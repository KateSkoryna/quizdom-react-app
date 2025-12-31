import { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { useLikesStore } from "../../../store/likesStore";
import { ACTION } from "../../../types/user";
import styles from "../../../styles/components/quizCard.module.scss";
import { ToggleAction } from "../toggleAction";

type LikeElementProps = {
  quizId: string;
  likesCount: number;
  onAuthRequired: () => void;
};

const LikeElement = ({ quizId, likesCount, onAuthRequired }: LikeElementProps) => {
  const toggleLike = useLikesStore((state) => state.toggleLike);
  const isLiked = useLikesStore((state) => state.likedQuizIds.includes(quizId));
  const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);

  const handleToggle = async (action: "ADD" | "REMOVE") => {
    const actionEnum = action === "ADD" ? ACTION.ADD : ACTION.REMOVE;

    // Update count optimistically
    setCurrentLikesCount((prev) => (action === "ADD" ? prev + 1 : prev - 1));

    await toggleLike(quizId, actionEnum);
  };

  return (
    <div className={styles.likeContainer}>
      <ToggleAction
        isChecked={isLiked}
        onToggle={handleToggle}
        onAuthRequired={onAuthRequired}
        icon={<MdFavoriteBorder />}
        inputId={`like-${quizId}`}
        className={styles.shareButton}
        ariaLabel="Like quiz"
      />
      {currentLikesCount > 0 && <span className={styles.likeCount}>{currentLikesCount}</span>}
    </div>
  );
};

export default LikeElement;
