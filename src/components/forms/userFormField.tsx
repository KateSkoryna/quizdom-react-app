import { Card } from "react-bootstrap";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import styles from "../../styles/pages/user.module.scss";

interface UserFormFieldProps<T extends FieldValues> {
  label: string;
  value?: string;
  isEditMode: boolean;
  fieldName: Path<T>;
  fieldType?: "text" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  register?: UseFormRegister<T>;
}

export const UserFormField = <T extends FieldValues>({
  label,
  value,
  isEditMode,
  fieldName,
  fieldType = "text",
  placeholder,
  options,
  register,
}: UserFormFieldProps<T>) => {
  const renderEditField = () => {
    if (!register) {
      return null;
    }

    if (fieldType === "select" && options) {
      return (
        <select className="form-select form-select-sm" {...register(fieldName)}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (fieldType === "textarea") {
      return (
        <textarea
          className="form-control form-control-sm"
          {...register(fieldName)}
          placeholder={placeholder}
          rows={3}
        />
      );
    }

    return (
      <input
        type={fieldType}
        className="form-control form-control-sm"
        {...register(fieldName)}
        placeholder={placeholder}
      />
    );
  };

  return (
    <Card.Text
      as="div"
      className={`${styles.cardText} d-flex justify-content-between align-items-center`}
    >
      <strong>{label}:</strong>
      <span>{isEditMode ? renderEditField() : value || "Not set"}</span>
    </Card.Text>
  );
};
