import { useState } from "react";
import FavoriteElement from "../quiz/quizItem/favoriteElement";
import ShareIcon from "../icons/shareIcon";
import NavigateUserModal from "./navigateUserModal";
import styles from "../../styles/components/quizCard.module.scss";

const QuizNoUserModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this quiz!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className={styles.actionButtons}>
      <FavoriteElement quizId={id} onAuthRequired={handleModalToggle} />
      <button onClick={handleShare} className={styles.shareButton} aria-label="Share quiz">
        <ShareIcon className={styles.shareIcon} />
      </button>
      {isModalOpen && <NavigateUserModal handleClose={handleModalToggle} show={isModalOpen} />}
    </div>
  );
};
export default QuizNoUserModal;
