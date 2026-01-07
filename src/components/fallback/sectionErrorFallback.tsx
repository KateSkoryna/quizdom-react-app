import { Alert, Button } from "react-bootstrap";

type SectionErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
  section?: string;
};

const SectionErrorFallback = ({ error: _error, resetErrorBoundary, section }: SectionErrorFallbackProps) => {
  return (
    <div style={{
      maxWidth: "1320px",
      margin: "0 auto",
      padding: "0 12px 24px 12px",
      width: "100%"
    }}>
      <Alert variant="danger">
        <Alert.Heading>Failed to load {section || "this section"}</Alert.Heading>
        <p>Something went wrong while rendering this content.</p>
        <hr />
        <div className="d-flex gap-2">
          <Button size="sm" variant="outline-danger" onClick={resetErrorBoundary}>
            Retry
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default SectionErrorFallback;
