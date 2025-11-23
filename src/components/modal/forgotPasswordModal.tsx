import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/auth.module.scss";

type ForgotPasswordModalProps = {
  show: boolean;
  handleClose: () => void;
};

const ForgotPasswordModal = ({
  show,
  handleClose,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = useAuthStore((state) => state.resetPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
      setEmail("");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("user-not-found")) {
          setError("No account found with this email address");
        } else if (err.message.includes("invalid-email")) {
          setError("Please enter a valid email address");
        } else {
          setError("Failed to send reset email. Please try again.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <div className="text-success">
            Password reset email sent! Check your inbox for further
            instructions.
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="resetEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {error && (
                <Form.Text className="text-danger mt-1 d-block">
                  {error}
                </Form.Text>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={styles.formBtn}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPasswordModal;
