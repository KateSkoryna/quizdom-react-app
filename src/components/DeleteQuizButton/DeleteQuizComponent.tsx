import { TfiTrash } from "react-icons/tfi";
import styles from "./DeleteQuizComponent.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const DeleteQuizComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className={styles.deleteBtn} onClick={handleShow}>
        <TfiTrash className={styles.deleteBtnIcon} />
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h5">
            Are you sure you want to delete this quiz?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Be careful! After deletion, you cannot recover it.
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteQuizComponent;
