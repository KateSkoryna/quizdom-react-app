import { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "../../../styles/components/quizCard.module.scss";
import QuizModal from "../../modal/quizModal";
import { RiAddLine } from "react-icons/ri";

const AddQuizCard = () => {
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  return (
    <>
      <Card className={styles.gridCard}>
        <div className={styles.addQuizCardContent} onClick={handleShowModal}>
          <div className={styles.addQuizIcon}>
            <RiAddLine />
          </div>
          <h3 className={styles.addQuizText}>ADD QUIZ</h3>
        </div>
      </Card>
      {show && <QuizModal showModal={show} handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default AddQuizCard;
