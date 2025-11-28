import Modal from "react-bootstrap/Modal";
import WarnUserContainer from "../common/warnUserContainer";
import styles from "../../styles/components/modal.module.scss";
import owl from "../../assets/owl.svg";
import { Card } from "react-bootstrap";

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
      <Modal.Body className={styles.modalBody}>
        <WarnUserContainer text={"add this quiz to your collection"} />
        <Card.Img src={owl} className={styles.img} />
      </Modal.Body>
    </Modal>
  );
}

export default NavigateUserModal;
