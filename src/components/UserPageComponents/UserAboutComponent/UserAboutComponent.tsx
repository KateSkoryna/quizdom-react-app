import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./UserAboutComponent.module.css";
import { CiEdit } from "react-icons/ci";
import { useAuth } from "../../../context/AuthContext";
import { CurrentUser } from "../../../types/types";
import { editUserInfo } from "../../../API/api";

export const UserAboutComponent = ({ info }: { info: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(info);

  const { setCurrentUser, currentUser } = useAuth();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = (value: string) => {
    setValue(value);
  };

  const handleSaveButtonClick = async () => {
    if (currentUser) {
      await editUserInfo(currentUser?.id, value);
      setCurrentUser((prev) => {
        return {
          ...((prev as CurrentUser) ?? {}),
          userInfo: value,
        };
      });
    }
    setIsEdit(!isEdit);
  };
  return (
    <div className="mt-3">
      <h4 className="mb-3">
        About me <CiEdit className={styles.editIcon} onClick={handleEdit} />
      </h4>

      {isEdit ? (
        <div>
          <Form.Control
            as="textarea"
            onChange={(e) => handleSave(e.target.value)}
          />
          <Button className="mt-3" onClick={handleSaveButtonClick}>
            Save
          </Button>
        </div>
      ) : (
        <p className={styles.aboutText}>{info}</p>
      )}
    </div>
  );
};
