import { useState } from "react";
import { MdAdd } from "react-icons/md";
import QuizModal from "../modal/quizModal";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/pages/profile.module.scss";

const AddQuizComponent = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  if (!currentUser) return null;

  return (
    <>
      <button type="button" onClick={handleShowModal} className={styles.primaryButton}>
        <MdAdd aria-hidden="true" />
        Create quiz
      </button>

      {show && <QuizModal showModal={show} handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default AddQuizComponent;
