import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./UserAboutComponent.module.css";
import { CiEdit } from "react-icons/ci";

export const UserAboutComponent = ({ info }: { info: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(info);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSaveButtonClick = () => {
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
