import { useFormContext } from "react-hook-form";
import styles from "./FormCheckboxComponent.module.css";
import { FaCheck } from "react-icons/fa";

export const FormCheckboxComponent = ({
  label,
  nestIndex,
  index,
}: {
  label: string;
  nestIndex: number;
  index: number;
}) => {
  const { register } = useFormContext();
  return (
    <div className={styles.checkbox}>
      <label>
        <input
          type="checkbox"
          {...register(
            `questions[${nestIndex}].answers[${index}].isCorrect` as const
          )}
        />
        <span className={styles.checkboxIconWrapper}>
          <FaCheck className={styles.checkboxIcon} />
        </span>
        {label}
      </label>
    </div>
  );
};
