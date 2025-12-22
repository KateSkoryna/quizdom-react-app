import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthStore } from "../../../store/authStore";
import { useQuizCompletionStore } from "../../../store/quizAttemptsStore";
import StartQuizModal from "../../modal/startQuizModal";
import NavigateUserModal from "../../modal/navigateUserModal";
import styles from "../../../styles/components/quizCard.module.scss";
import QuizNoUserModal from "../../modal/quizNoUserModal";
import QuizStatistic from "./quizStatistic";
import LikeElement from "./likeElement";

type StartQuizButtonProps = {
  questions: Array<any>;
  quizId: string;
};

const QuizCardBackside = ({ questions, quizId }: StartQuizButtonProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { isLoading, completionCache } = useQuizCompletionStore();
  const [startQuiz, setStartQuiz] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const completion = completionCache[quizId];

  const handleStart = () => {
    if (!currentUser) {
      setIsModalOpen(true);
      return;
    }

    if (completion) {
      return;
    }

    setStartQuiz(true);
  };

  const handleEnd = () => setStartQuiz(false);
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  // Show completion status only if user is authenticated and has completed
  const hasCompleted = currentUser && !!completion;

  // calculate user scores
  const correct = completion?.score?.correctAnswers ?? 0;
  const total = completion?.score?.totalQuestions ?? 1;

  const score = `${correct} from ${total}`;
  const scoreRate = `${Number((correct / total) * 100).toFixed()}%`;

  const showLoading = !!(currentUser && isLoading);

  return (
    <div className={styles.back}>
      <QuizNoUserModal id={quizId} />
      <div className={styles.likeButtonContainer}>
        <LikeElement quizId={quizId} onAuthRequired={handleModalToggle} />
      </div>
      <div className={styles.startButtonContainer}>
        {hasCompleted ? (
          <QuizStatistic score={score} scoreRate={scoreRate} />
        ) : (
          <Button onClick={handleStart} className={styles.startButton} disabled={showLoading}>
            {showLoading ? "Loading..." : "Start"}
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
