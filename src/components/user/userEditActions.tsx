import { MdEdit } from "react-icons/md";
import styles from "../../styles/pages/profile.module.scss";

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
    <div className={styles.actions}>
      {progressUpload > 0 && (
        <div
          className={styles.uploadTrack}
          role="progressbar"
          aria-label="Profile photo upload progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressUpload)}
        >
          <div className={styles.uploadFill} style={{ width: `${progressUpload}%` }} />
        </div>
      )}
      {isEditMode ? (
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onSave}
            disabled={loading || !isDirty}
          >
            {loading ? "Saving..." : "Save profile"}
          </button>
        </div>
      ) : (
        <button type="button" className={styles.secondaryButton} onClick={onEdit}>
          <MdEdit aria-hidden="true" />
          Edit profile
        </button>
      )}
    </div>
  );
};
