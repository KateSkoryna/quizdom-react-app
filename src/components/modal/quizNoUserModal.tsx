import { useState, lazy, Suspense } from "react";
import FavoriteElement from "../quiz/favoriteElement";
import ShareIcon from "../common/shareIcon";
import Loader from "../common/loader";
import styles from "../../styles/components/quizCard.module.scss";

// Lazy load modal - only loads when user needs to authenticate
const NavigateUserModal = lazy(() => import("./navigateUserModal"));

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
      <button
        onClick={handleShare}
        className={styles.shareButton}
        aria-label="Share quiz"
      >
        <ShareIcon className={styles.shareIcon} />
      </button>
      {isModalOpen && (
        <Suspense fallback={<Loader />}>
          <NavigateUserModal handleClose={handleModalToggle} show={isModalOpen} />
        </Suspense>
      )}
    </div>
  );
};
export default QuizNoUserModal;
