import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuthStore } from "../../../store/AuthStore";
import { useQuizCompletionStore } from "../../../store/quizAttemptsStore";
import StartQuizModal from "../../modal/startQuizModal";
import NavigateUserModal from "../../modal/navigateUserModal";
import styles from "../../../styles/components/quizCard.module.scss";
import QuizNoUserModal from "../../modal/quizNoUserModal";
import QuizStatistic from "./quizStatistic";

type StartQuizButtonProps = {
  questions: Array<any>;
  quizId: string;
};

const QuizCardBackside = ({ questions, quizId }: StartQuizButtonProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { completion, loadCompletion, isLoading } = useQuizCompletionStore();
  const [startQuiz, setStartQuiz] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load completion when user is logged in
  useEffect(() => {
    if (currentUser && quizId) {
      loadCompletion(quizId);
    }
  }, [currentUser, quizId, loadCompletion]);

  const handleStart = () => {
    if (!currentUser) {
      setIsModalOpen(true);
      return;
    }

    if (completion) {
      return; // User already completed the quiz
    }

    setStartQuiz(true);
  };

  const handleEnd = () => setStartQuiz(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  // Show completion status if user already completed
  const hasCompleted = !!completion;

  // calculate user scores
  const correct = completion?.score?.correctAnswers ?? 0;
  const total = completion?.score?.totalQuestions ?? 1;

  const score = `${correct} from ${total}`;
  const scoreRate = (correct / total) * 100;

  return (
    <div className={styles.back}>
      <QuizNoUserModal id={quizId} />
      <div className={styles.startButtonContainer}>
        {hasCompleted ? (
          <QuizStatistic score={score} scoreRate={scoreRate} />
        ) : (
          <Button onClick={handleStart} className={styles.startButton} disabled={isLoading}>
            {isLoading ? "Loading..." : "Start"}
          </Button>
        )}
      </div>
      {startQuiz && (
        <StartQuizModal
          show={startQuiz}
          handleClose={handleEnd}
          questions={questions}
          quizId={quizId}
        />
      )}
      {isModalOpen && <NavigateUserModal handleClose={handleModalToggle} show={isModalOpen} />}
    </div>
  );
};

export default QuizCardBackside;
