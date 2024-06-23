import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WarnUserText from "../WarnUserText/WarnUserText";

function NavigateUserModal({
  handleClose,
  show,
}: {
  handleClose: () => void;
  show: boolean;
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5" className="text-center">
          Sorry!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WarnUserText text={"add this quiz to your collection"} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NavigateUserModal;
