import { Control, Controller, FieldValues, Path } from "react-hook-form";
import DatepickerContainer from "../common/datepicker";
import styles from "../../styles/pages/profile.module.scss";
import dayjs from "dayjs";

interface UserBirthFormFieldProps<T extends FieldValues> {
  label: string;
  value?: Date;
  isEditMode: boolean;
  control: Control<T>;
  fieldName: Path<T>;
}

export const UserBirthFormField = <T extends FieldValues>({
  label,
  value,
  isEditMode,
  control,
  fieldName,
}: UserBirthFormFieldProps<T>) => {
  const isValidDate = value instanceof Date && !isNaN(value.getTime());
  const formattedDate = isValidDate ? dayjs(value).format("DD-MM-YYYY") : "Not set";

  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={`${styles.fieldValue} ${isValidDate || isEditMode ? "" : styles.fieldMuted}`}>
        {isEditMode ? (
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatepickerContainer value={value} callback={onChange} selectedColor="#f7941d" />
            )}
          />
        ) : (
          formattedDate
        )}
      </div>
    </div>
  );
};
