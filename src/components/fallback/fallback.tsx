import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/quizzes");
    resetErrorBoundary();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
      <Alert variant="danger" style={{ maxWidth: "600px", width: "100%" }}>
        <Alert.Heading>⚠️ Something went wrong</Alert.Heading>
        <p>
          We encountered an unexpected error. This has been logged and our team will look into it.
        </p>
        <hr />
        <details style={{ marginBottom: "1rem" }}>
          <summary style={{ cursor: "pointer", userSelect: "none" }}>Technical details</summary>
          <pre style={{
            fontSize: "0.85rem",
            marginTop: "0.5rem",
            padding: "0.5rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            overflow: "auto"
          }}>
            {error.message}
          </pre>
        </details>
        <div className="d-flex gap-2">
          <Button variant="danger" onClick={resetErrorBoundary}>
            Try Again
          </Button>
          <Button variant="outline-secondary" onClick={handleGoHome}>
            Go to Home
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ErrorFallback;
