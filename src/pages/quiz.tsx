import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Badge } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { useQuizCompletionStore } from "../store/quizAttemptsStore";
import Loader from "../components/common/loader";
import StartQuizModal from "../components/modal/startQuizModal";
import NavigateUserModal from "../components/modal/navigateUserModal";
import QuizCover from "../components/quiz/quizItem/quizCover";
import QuizLevelBadge from "../components/quiz/quizItem/quizLevelBadge";
import QuizStats from "../components/quiz/quizItem/quizStats";
import styles from "../styles/components/modal.module.scss";
import cardStyles from "../styles/components/quizCard.module.scss";
import dayjs from "dayjs";
import { ErrorBoundary } from "react-error-boundary";
import SectionErrorFallback from "../components/fallback/sectionErrorFallback";
import { useQuizById } from "../hooks/useQuizzes";
import { useEffect, useState } from "react";

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [showPreQuizModal, setShowPreQuizModal] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const { completionCache } = useQuizCompletionStore();

  const { data: quiz, isLoading } = useQuizById(quizId);

  // Open pre-quiz modal once quiz is loaded
  useEffect(() => {
    if (quiz) {
      setShowPreQuizModal(true);
    } else if (!quizId) {
      navigate("/quizzes");
    }
  }, [quiz, quizId, navigate]);

  const handleStartFromPreQuiz = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const completion = quiz && completionCache[quiz.id];
    if (completion) return;

    setShowPreQuizModal(false);
    setStartQuiz(true);
  };

  const handleClosePreQuizModal = () => {
    setShowPreQuizModal(false);
    navigate("/quizzes");
  };

  const handleEndQuiz = () => {
    setStartQuiz(false);
    navigate("/quizzes");
  };

  const handleAuthModalToggle = () => setIsAuthModalOpen(!isAuthModalOpen);

  if (isLoading) return <Loader />;
  if (!quiz) return null;

  const completion = completionCache[quiz.id];
  const hasCompleted = currentUser && !!completion;
  const localizedDate = dayjs(quiz.publishedAt).format("DD/MM/YYYY");

  return (
    <>
      {/* Pre-Quiz Info Modal */}
      <Modal
        show={showPreQuizModal}
        onHide={handleClosePreQuizModal}
        size="lg"
        centered
        dialogClassName={styles.startQuizModalDialog}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title as="h4">Quiz Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.preQuizBody}>
          <ErrorBoundary
            FallbackComponent={(props) => (
              <SectionErrorFallback {...props} section="quiz preview" />
            )}
          >
            <div className={cardStyles.quizCardContent}>
              {hasCompleted && (
                <Badge bg="success" className={cardStyles.completedBadge}>
                  ✓ Completed
                </Badge>
              )}
              <QuizCover title={quiz.title} category={quiz.category} />
              <div className={cardStyles.quizInfoCard}>
                <h3 className="mb-3">{quiz.title}</h3>
                <p className={cardStyles.description}>{quiz.description}</p>
                <QuizLevelBadge complexity={quiz.complexity} />
                <QuizStats
                  rating={quiz.rating ?? 0}
                  authorName={quiz.authorName}
                  publishedAt={localizedDate}
                  currentUser={!!currentUser}
                  questionsCount={quiz.questions.length}
                />
              </div>
            </div>
          </ErrorBoundary>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          {hasCompleted ? (
            <p className="text-muted">You have already completed this quiz!</p>
          ) : (
            <Button onClick={handleStartFromPreQuiz} className={styles.primaryButton}>
              Start Quiz
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Actual Quiz Modal */}
      {startQuiz && quiz && (
        <StartQuizModal
          show={startQuiz}
          handleClose={handleEndQuiz}
          questions={quiz.questions}
          quizId={quiz.id}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <NavigateUserModal handleClose={handleAuthModalToggle} show={isAuthModalOpen} />
      )}
    </>
  );
};

export default QuizPage;
