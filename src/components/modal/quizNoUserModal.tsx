import { useState } from "react";
import NavigateUserModal from "./navigateUserModal";
import FavoriteElement from "../quiz/favoriteElement";

const QuizNoUserModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  return (
    <>
      <FavoriteElement quizId={id} onAuthRequired={handleModalToggle} />
      {isModalOpen && (
        <NavigateUserModal handleClose={handleModalToggle} show={isModalOpen} />
      )}
    </>
  );
};
export default QuizNoUserModal;
