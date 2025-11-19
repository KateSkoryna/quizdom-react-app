import { Button, Card } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "../../styles/pages/user.module.scss";

interface UserEditActionsProps {
  isEditMode: boolean;
  loading: boolean;
  isDirty: boolean;
  progressUpload: number;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const UserEditActions = ({
  isEditMode,
  loading,
  isDirty,
  progressUpload,
  onEdit,
  onSave,
  onCancel,
}: UserEditActionsProps) => {
  return (
    <Card.Footer
      className="mt-auto"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="mb-2" style={{ minHeight: "1.5rem" }}>
        <ProgressBar
          animated={progressUpload > 0 && progressUpload < 100}
          now={progressUpload}
          variant={progressUpload > 0 ? "primary" : "secondary"}
          label={progressUpload > 0 ? `${Math.round(progressUpload)}%` : ""}
        />
      </div>
      {isEditMode ? (
        <div className="d-flex gap-2">
          <Button
            className="flex-grow-1"
            onClick={onSave}
            disabled={loading || !isDirty}
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          className={`w-100 ${styles.editProfileBtn}`}
          onClick={onEdit}
        >
          Edit Profile
        </Button>
      )}
    </Card.Footer>
  );
};
