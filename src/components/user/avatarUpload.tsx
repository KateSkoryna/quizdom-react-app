import { Card } from "react-bootstrap";
import styles from "../../styles/pages/user.module.scss";
import { avatar as defaultAvatar } from "../../utils/generateRandomAvatar";

interface AvatarUploadProps {
  avatarUrl?: string;
  isEditMode: boolean;
  onFileSelect: (files: FileList | null) => void;
}

export const AvatarUpload = ({ avatarUrl, isEditMode, onFileSelect }: AvatarUploadProps) => {
  return (
    <div className={styles.userImage}>
      {isEditMode && (
        <label className={styles.inputUpload}>
          <input
            type="file"
            onChange={(e) => onFileSelect(e.target.files)}
            aria-label="Upload profile photo"
          />
        </label>
      )}
      <Card.Img src={avatarUrl || defaultAvatar} className={styles.cardImg} />
    </div>
  );
};
