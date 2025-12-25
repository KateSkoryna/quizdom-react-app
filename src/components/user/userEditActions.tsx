import { Card, Button } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import modalStyles from "../../styles/components/modal.module.scss";

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
    <Card.Footer className="mt-auto" style={{ backgroundColor: "transparent" }}>
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
            type="button"
            className={`flex-grow-1 ${modalStyles.primaryButton}`}
            onClick={onSave}
            disabled={loading || !isDirty}
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>
          <Button
            type="button"
            variant=""
            className={modalStyles.secondaryButton}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button type="button" className={`w-100 ${modalStyles.primaryButton}`} onClick={onEdit}>
          Edit Profile
        </Button>
      )}
    </Card.Footer>
  );
};
