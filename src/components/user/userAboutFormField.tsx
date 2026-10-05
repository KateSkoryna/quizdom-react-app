import { useId, type ReactNode } from "react";
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
  icon?: ReactNode;
}

export const UserAboutFormField = <T extends FieldValues>({
  label,
  value,
  isEditMode,
  fieldName,
  placeholder,
  register,
  control,
  icon,
}: UserAboutFormFieldProps<T>) => {
  const currentValue = useWatch({ control, name: fieldName }) as string | undefined;
  const charCount = currentValue?.length || 0;
  const inputId = useId();

  return (
    <div className={styles.field}>
      {icon && (
        <span className={styles.fieldIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <div className={styles.fieldBody}>
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
            <p className={`${styles.fieldValueText} ${value ? "" : styles.fieldMuted}`}>
              {value || "I'm a new user and I don't have a bio yet"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
