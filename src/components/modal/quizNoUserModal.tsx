import { useState } from "react";
import FavoriteElement from "../quiz/quizItem/favoriteElement";

import NavigateUserModal from "./navigateUserModal";
import styles from "../../styles/components/quizCard.module.scss";
import ShareElement from "../quiz/quizItem/shareElement";

const QuizNoUserModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className={styles.actionButtons}>
        <FavoriteElement quizId={id} onAuthRequired={handleModalToggle} />
        <ShareElement quizId={id} onAuthRequired={handleModalToggle} />
      </div>
      {isModalOpen && <NavigateUserModal handleClose={handleModalToggle} show={isModalOpen} />}
    </>
  );
};
export default QuizNoUserModal;
