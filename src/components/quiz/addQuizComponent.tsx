import { lazy, Suspense } from "react";
import { useOpenQuizModal } from "../../store/store";
import { Button, Container } from "react-bootstrap";
import UserQuizList from "../user/userQuizList";
import styles from "../../styles/components/addQuiz.module.scss";
import { useAuthStore } from "../../store/AuthStore";
import Loader from "../common/loader";

// Lazy load the modal - only loads when user clicks "Create Your Quiz"
const QuizModal = lazy(() => import("../modal/quizModal"));

const AddQuizComponent = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const show = useOpenQuizModal((state) => state.show);
  const handleModal = useOpenQuizModal((state) => state.setShow);

  const handleCloseModal = () => {
    handleModal(false);
  };
  const handleShowModal = () => {
    handleModal(true);
  };
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
      {show && (
        <Suspense fallback={<Loader />}>
          <QuizModal showModal={show} handleCloseModal={handleCloseModal} />
        </Suspense>
      )}
    </Container>
  ) : null;
};

export default AddQuizComponent;
