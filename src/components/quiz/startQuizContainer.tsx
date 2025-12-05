import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/home.module.scss";
import StartQuizButton from "./quizItem/startQuizButton";
import { Button } from "react-bootstrap";
import { Question } from "../../types/types";
import Card from "react-bootstrap/Card";

const StartQuizContainer = ({ questions }: { questions: Question[] }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <>
      {currentUser && (
        <div className={styles.buttonContainer}>
          <StartQuizButton questions={questions} />
          <Card.Link as={Button}>Share Quiz</Card.Link>
        </div>
      )}
    </>
  );
};

export default StartQuizContainer;
