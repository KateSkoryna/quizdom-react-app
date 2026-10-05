import { useId } from "react";
import { UseFormRegister, FieldValues, Path, useWatch, Control } from "react-hook-form";
import styles from "../../styles/pages/profile.module.scss";

interface UserAboutFormFieldProps<T extends FieldValues> {
  label: string;
  value?: string;
  isEditMode: boolean;
  fieldName: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  control: Control<T>;
}

export const UserAboutFormField = <T extends FieldValues>({
  label,
  value,
  isEditMode,
  fieldName,
  placeholder,
  register,
  control,
}: UserAboutFormFieldProps<T>) => {
  const currentValue = useWatch({ control, name: fieldName }) as string | undefined;
  const charCount = currentValue?.length || 0;
  const inputId = useId();

  return (
    <div className={styles.field}>
      {isEditMode ? (
        <>
          <label htmlFor={inputId} className={styles.fieldLabel}>
            {label}
          </label>
          <textarea
            id={inputId}
            className={styles.input}
            {...register(fieldName)}
            placeholder={placeholder}
            rows={4}
            maxLength={200}
          />
          <small className={styles.charCount}>{charCount}/200</small>
        </>
      ) : (
        <>
          <span className={styles.fieldLabel}>{label}</span>
          <p className={`${styles.fieldValue} ${value ? "" : styles.fieldMuted}`}>
            {value || "I'm a new user and I don't have a bio yet"}
          </p>
        </>
      )}
    </div>
  );
};
