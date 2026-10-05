import { useId, type ReactNode } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import styles from "../../styles/pages/profile.module.scss";

interface UserFormFieldProps<T extends FieldValues> {
  label: string;
  value?: string;
  isEditMode: boolean;
  fieldName: Path<T>;
  fieldType?: "text" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  register?: UseFormRegister<T>;
  icon?: ReactNode;
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
  icon,
}: UserFormFieldProps<T>) => {
  const inputId = useId();
  const isEditing = isEditMode && !!register;

  const renderEditField = () => {
    if (!register) {
      return null;
    }

    if (fieldType === "select" && options) {
      return (
        <select id={inputId} className={`form-select ${styles.input}`} {...register(fieldName)}>
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
          id={inputId}
          className={styles.input}
          {...register(fieldName)}
          placeholder={placeholder}
          rows={3}
        />
      );
    }

    return (
      <input
        id={inputId}
        type={fieldType}
        className={styles.input}
        {...register(fieldName)}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div className={styles.field}>
      {icon && (
        <span className={styles.fieldIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <div className={styles.fieldBody}>
        {isEditing ? (
          <label htmlFor={inputId} className={styles.fieldLabel}>
            {label}
          </label>
        ) : (
          <span className={styles.fieldLabel}>{label}</span>
        )}
        {isEditing ? (
          renderEditField()
        ) : (
          <p className={`${styles.fieldValue} ${value ? "" : styles.fieldMuted}`}>
            {value || "Not set"}
          </p>
        )}
      </div>
    </div>
  );
};
