import { Toast, ToastContainer } from "react-bootstrap";
import { useGlobalErrorStore, ErrorSeverity } from "../../store/globalErrorStore";

export default function GlobalErrorNotification() {
  const errors = useGlobalErrorStore((state) => state.errors);
  const removeError = useGlobalErrorStore((state) => state.removeError);

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {errors.map((error) => (
        <Toast
          key={error.id}
          onClose={() => removeError(error.id)}
          show={true}
          autohide
          delay={7000}
          bg={error.severity === ErrorSeverity.ERROR ? "danger" : "warning"}
        >
          <Toast.Header>
            <strong className="me-auto">
              {error.severity === ErrorSeverity.ERROR ? "Error" : "Warning"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{error.userMessage}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
