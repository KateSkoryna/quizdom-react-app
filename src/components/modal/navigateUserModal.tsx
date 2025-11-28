import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import WarnUserContainer from "../common/warnUserContainer";

type NavigateUserModalProps = {
  handleClose: () => void;
  show: boolean;
};

function NavigateUserModal({ handleClose, show }: NavigateUserModalProps) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5" className="text-center">
          Sorry!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WarnUserContainer text={"add this quiz to your collection"} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NavigateUserModal;
