import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import QuizFormComponent from "../forms/quizFormComponent";
import styles from "../../styles/components/modal.module.scss";
import { useRef, useState, useCallback } from "react";
import { UserQuiz } from "../../types";
import { ErrorBoundary } from "react-error-boundary";
import SectionErrorFallback from "../fallback/sectionErrorFallback";

interface QuizModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  existingQuiz?: UserQuiz;
}

export type Status = "done" | "draft";

const QuizModal = ({ showModal, handleCloseModal, existingQuiz }: QuizModalProps) => {
  const formRef = useRef<{
    submit: (status: Status) => void;
    isSubmitting: boolean;
    isDirty: boolean;
  }>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [currentAction, setCurrentAction] = useState<Status | null>(null);

  const handleFormStateChange = useCallback(
    (state: { isDirty: boolean; isSubmitting: boolean }) => {
      setIsDirty(state.isDirty);
      setIsSubmitting(state.isSubmitting);
      if (!state.isSubmitting) {
        setCurrentAction(null);
      }
    },
    []
  );

  const handleSaveQuiz = (status: Status) => {
    setCurrentAction(status);
    formRef.current?.submit(status);
  };

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={handleCloseModal}
      scrollable
      dialogClassName={styles.quizModalDialog}
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title as="h2">{existingQuiz ? "Edit Quiz" : "Create your own Quiz"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorBoundary FallbackComponent={(props) => <SectionErrorFallback {...props} section="quiz form" />}>
          <QuizFormComponent
            ref={formRef}
            handleClose={handleCloseModal}
            onFormStateChange={handleFormStateChange}
            existingQuiz={existingQuiz}
          />
        </ErrorBoundary>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button
          type="button"
          className={styles.primaryButton}
          onClick={() => handleSaveQuiz("done")}
          disabled={isSubmitting}
        >
          {isSubmitting && currentAction === "done" ? "Publishing..." : "Publish Quiz"}
        </Button>
        <button
          type="button"
          className={styles.addQuestionButton}
          onClick={() => handleSaveQuiz("draft")}
          disabled={!isDirty || isSubmitting}
        >
          {isSubmitting && currentAction === "draft" ? "Saving..." : "Save to Drafts"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;
