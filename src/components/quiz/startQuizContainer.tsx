import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/home.module.scss";
import StartQuizButton from "./startQuizButton";
import { Button } from "react-bootstrap";
import StartQuizModal from "./startQuizModal";
import { Question } from "../../types/types";
import Card from "react-bootstrap/Card";

const StartQuizContainer = ({ questions }: { questions: Question[] }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleEnd = () => setStartQuiz(false);
  const handleStart = () => setStartQuiz(true);
  return (
    <>
      {currentUser && (
        <div className={styles.buttonContainer}>
          <StartQuizButton handleModal={handleStart} />
          <Card.Link as={Button}>Share Quiz</Card.Link>
        </div>
      )}
      {startQuiz && (
        <StartQuizModal
          show={startQuiz}
          handleClose={handleEnd}
          questions={questions}
        />
      )}
    </>
  );
};

export default StartQuizContainer;
