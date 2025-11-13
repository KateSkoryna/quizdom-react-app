import { useState } from "react";
import NavigateUserModal from "../common/navigateUserModal";
import FavoriteElement from "./favoriteElement";

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
