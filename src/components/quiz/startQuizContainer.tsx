import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/home.module.scss";
import StartQuizButton from "./quizItem/quizCardBackside";
import { Button } from "react-bootstrap";
import { Question } from "../../types";
import Card from "react-bootstrap/Card";

const StartQuizContainer = ({ questions, quizId }: { questions: Question[]; quizId: string }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <>
      {currentUser && (
        <div className={styles.buttonContainer}>
          <StartQuizButton questions={questions} quizId={quizId} />
          <Card.Link as={Button}>Share Quiz</Card.Link>
        </div>
      )}
    </>
  );
};

export default StartQuizContainer;
