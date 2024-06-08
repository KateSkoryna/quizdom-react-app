import Modal from "react-bootstrap/Modal";
import { QuizFormComponent } from "../QuizFormComponent/QuizFormComponent";

interface QuizModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

export const QuizModal = ({ showModal, handleCloseModal }: QuizModalProps) => {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={handleCloseModal}
      scrollable
      dialogClassName="h-75"
    >
      <Modal.Header closeButton>
        <Modal.Title as="h2">Create your own Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QuizFormComponent handleClose={handleCloseModal} />
      </Modal.Body>
    </Modal>
  );
};
