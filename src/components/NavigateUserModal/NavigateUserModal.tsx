import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavigateUserModal.module.css";
import { useActiveNavStore } from "../../store/store";

function NavigateUserModal({
  handleClose,
  show,
}: {
  handleClose: () => void;
  show: boolean;
}) {
  const navidate = useNavigate();
  const setActive = useActiveNavStore((state) => state.setActive);

  const handleNavigate = (path: string) => {
    setActive(path);
    navidate(path);
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5" className="text-center">
          Sorry!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={styles.text}>
          You need to be logged in to add this quiz to your collection. <br />
          Please{" "}
          <Link
            to="/login"
            className="text-primary"
            onClick={() => handleNavigate("login")}
          >
            log in
          </Link>{" "}
          or{" "}
          <Link
            to="/signup"
            className="text-primary"
            onClick={() => handleNavigate("signup")}
          >
            sign up
          </Link>{" "}
          to add this quiz to your collection.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NavigateUserModal;
