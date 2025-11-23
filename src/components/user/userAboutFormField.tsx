import { Card, Form } from "react-bootstrap";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import styles from "../../styles/pages/user.module.scss";

interface UserAboutFormFieldProps<T extends FieldValues> {
  label: string;
  value?: string;
  isEditMode: boolean;
  fieldName: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
}

export const UserAboutFormField = <T extends FieldValues>({
  label,
  value,
  isEditMode,
  fieldName,
  placeholder,
  register,
}: UserAboutFormFieldProps<T>) => {
  return (
    <Card.Text as="div" className={styles.cardText} style={{ textAlign: "start" }}>
      <strong>{label}:</strong>
      {isEditMode ? (
        <Form.Control
          as="textarea"
          className="form-control form-control-sm mt-2"
          {...register(fieldName)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <p
          className="mt-2 mb-0"
          style={{ color: !value ? "#6c757d" : "inherit", textAlign: "start" }}
        >
          {value || "I'm a new user and I don't have a bio yet"}
        </p>
      )}
    </Card.Text>
  );
};
