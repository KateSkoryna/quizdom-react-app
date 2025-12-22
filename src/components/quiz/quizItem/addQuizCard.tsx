import { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "../../../styles/components/quizCard.module.scss";
import QuizModal from "../../modal/quizModal";
import { MdAdd } from "react-icons/md";

const AddQuizCard = () => {
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  return (
    <>
      <Card className={styles.gridCard}>
        <button className={styles.addQuizCardBtn} onClick={handleShowModal}>
          <h3 className={styles.addQuizText}>ADD QUIZ</h3>
          <MdAdd className={styles.addQuizIcon} />
        </button>
      </Card>
      {show && <QuizModal showModal={show} handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default AddQuizCard;
