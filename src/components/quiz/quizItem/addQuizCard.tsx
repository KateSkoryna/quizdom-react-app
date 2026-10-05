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
        <button type="button" className={styles.addQuizCardBtn} onClick={handleShowModal}>
          <span className={styles.addQuizIcon}>
            <MdAdd aria-hidden="true" />
          </span>
          Add quiz
          <span className={styles.addQuizHint}>Write your own or let AI build it</span>
        </button>
      </Card>
      {show && <QuizModal showModal={show} handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default AddQuizCard;
