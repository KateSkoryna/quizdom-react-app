import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthStore } from "../../../store/AuthStore";
import StartQuizModal from "../../modal/startQuizModal";
import NavigateUserModal from "../../modal/navigateUserModal";
import styles from "../../../styles/components/quizCard.module.scss";

type StartQuizButtonProps = {
  questions: Array<any>;
};

const StartQuizButton = ({ questions }: StartQuizButtonProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [startQuiz, setStartQuiz] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStart = () => {
    if (!currentUser) {
      setIsModalOpen(true);
      return;
    }
    setStartQuiz(true);
  };

  const handleEnd = () => setStartQuiz(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className={styles.startButtonContainer}>
        <Button onClick={handleStart} className={styles.startButton}>
          Start
        </Button>
      </div>
      {startQuiz && (
        <StartQuizModal
          show={startQuiz}
          handleClose={handleEnd}
          questions={questions}
        />
      )}
      {isModalOpen && (
        <NavigateUserModal handleClose={handleModalToggle} show={isModalOpen} />
      )}
    </>
  );
};

export default StartQuizButton;
