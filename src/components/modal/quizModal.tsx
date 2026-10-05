import Modal from "react-bootstrap/Modal";
import QuizFormComponent from "../forms/quizFormComponent";
import styles from "../../styles/components/quizForm.module.scss";
import { MdPublish, MdSaveAlt } from "react-icons/md";
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
      dialogClassName={styles.dialog}
      centered
    >
      <Modal.Header closeButton closeVariant="white" className={styles.header}>
        <div className={styles.headerText}>
          <Modal.Title as="h2" className={styles.title}>
            {existingQuiz ? "Edit quiz" : "Create your own quiz"}
          </Modal.Title>
          <p className={styles.subtitle}>
            {existingQuiz
              ? "Update questions, hints and answers, then publish your changes."
              : "Write questions yourself or let AI draft them, then fine-tune every answer."}
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <ErrorBoundary
          FallbackComponent={(props) => <SectionErrorFallback {...props} section="quiz form" />}
        >
          <QuizFormComponent
            ref={formRef}
            handleClose={handleCloseModal}
            onFormStateChange={handleFormStateChange}
            existingQuiz={existingQuiz}
          />
        </ErrorBoundary>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <button
          type="button"
          className={styles.draftButton}
          onClick={() => handleSaveQuiz("draft")}
          disabled={!isDirty || isSubmitting}
        >
          <MdSaveAlt aria-hidden="true" />
          {isSubmitting && currentAction === "draft" ? "Saving..." : "Save to drafts"}
        </button>
        <button
          type="button"
          className={styles.publishButton}
          onClick={() => handleSaveQuiz("done")}
          disabled={isSubmitting}
        >
          <MdPublish aria-hidden="true" />
          {isSubmitting && currentAction === "done" ? "Publishing..." : "Publish quiz"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;
