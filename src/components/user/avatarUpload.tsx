import { MdPhotoCamera } from "react-icons/md";
import styles from "../../styles/pages/profile.module.scss";

interface AvatarUploadProps {
  avatarUrl?: string;
  isEditMode: boolean;
  onFileSelect: (files: FileList | null) => void;
}

export const AvatarUpload = ({ avatarUrl, isEditMode, onFileSelect }: AvatarUploadProps) => {
  return (
    <div className={styles.avatar}>
      <img src={avatarUrl} className={styles.avatarImg} alt="Your profile avatar" />
      {isEditMode && (
        <label className={styles.avatarUpload} title="Change photo">
          <input
            type="file"
            accept="image/*"
            className="visually-hidden"
            onChange={(e) => onFileSelect(e.target.files)}
            aria-label="Upload profile photo"
          />
          <MdPhotoCamera aria-hidden="true" />
        </label>
      )}
    </div>
  );
};
