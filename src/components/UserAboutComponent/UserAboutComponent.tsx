import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import styles from "./UserAboutComponent.module.css";

export const UserAboutComponent = ({ info }: { info: string }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(info);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSaveButtonClick = () => {
    console.log(input);
    setIsEdit(!isEdit);
  };
  return (
    <div className="mt-3">
      <h4 className="mb-3">About me</h4>
      {isEdit ? (
        <div>
          <Form.Control
            as="textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSaveButtonClick}>Save</Button>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <p className={styles.aboutText}>{info}</p>
          <Button onClick={handleEdit}>Edit you story</Button>
        </div>
      )}
    </div>
  );
};
