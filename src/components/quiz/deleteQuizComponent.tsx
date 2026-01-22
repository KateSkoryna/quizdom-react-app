import { MdDeleteOutline } from "react-icons/md";
import styles from "../../styles/components/userQuiz.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDeleteQuiz } from "../../hooks/useQuizzes";
import { useGlobalErrorStore, ErrorSeverity } from "../../store/globalErrorStore";

interface DeleteQuizComponentProps {
  quizId: string;
  quizTitle: string;
}

const DeleteQuizComponent = ({ quizId, quizTitle }: DeleteQuizComponentProps) => {
  const [show, setShow] = useState(false);
  const { mutate: deleteQuiz, isPending } = useDeleteQuiz();
  const addError = useGlobalErrorStore((state) => state.addError);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteQuiz(quizId, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        addError({
          userMessage: error.message || "Failed to delete quiz",
          severity: ErrorSeverity.ERROR,
          dismissable: true,
        });
      },
    });
  };

  return (
    <>
      <Button className={styles.deleteBtn} onClick={handleShow} aria-label="Delete quiz">
        <MdDeleteOutline className={styles.deleteBtnIcon} />
      </Button>
      <Modal show={show} onHide={handleClose} centered dialogClassName={styles.deleteModalDialog}>
        <Modal.Header closeButton>
          <Modal.Title as="h6">Are you sure you want to delete this quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="mb-2">
            <strong>{quizTitle}</strong>
          </p>
          Be careful! After deletion, you cannot recover it.
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant=""
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete quiz"}
          </Button>
          <Button
            variant=""
            className={styles.secondaryButton}
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQuizComponent;
