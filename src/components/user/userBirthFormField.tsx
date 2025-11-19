import { Card } from "react-bootstrap";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import DatepickerContainer from "../common/datepicker";
import styles from "../../styles/pages/user.module.scss";

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
  const formattedDate = value
    ? value.toLocaleDateString().split("/").join(".")
    : "Not set";

  return (
    <Card.Text
      className={`${styles.birthField} d-flex justify-content-between align-items-center`}
    >
      <strong>{label}:</strong>
      <span>
        {isEditMode ? (
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatepickerContainer
                value={value}
                callback={onChange}
                selectedColor="#f7941d"
              />
            )}
          />
        ) : (
          formattedDate
        )}
      </span>
    </Card.Text>
  );
};
