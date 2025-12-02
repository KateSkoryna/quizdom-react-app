import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import UserQuizList from "../user/userQuizList";
import QuizModal from "../modal/quizModal";
import styles from "../../styles/components/addQuiz.module.scss";
import { useAuthStore } from "../../store/AuthStore";

const AddQuizComponent = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);
  return currentUser ? (
    <Container className={styles.addQuizContainer}>
      <Button onClick={handleShowModal} className={styles.ctaButton}>
        <span className={styles.plusIcon}>+</span>
        Create Your Quiz
      </Button>
      <p className={styles.ctaSubtext}>
        Share your knowledge and challenge others!
      </p>

      <UserQuizList />
      {show && <QuizModal showModal={show} handleCloseModal={handleCloseModal} />}
    </Container>
  ) : null;
};

export default AddQuizComponent;
