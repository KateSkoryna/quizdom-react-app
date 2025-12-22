import { useFormContext } from "react-hook-form";
import styles from "../../styles/components/modal.module.scss";
import { MdCheck } from "react-icons/md";

type FormCheckboxProps = {
  label: string;
  nestIndex: number;
  index: number;
};

const FormCheckboxComponent = ({ label, nestIndex, index }: FormCheckboxProps) => {
  const { register } = useFormContext();
  return (
    <div className={styles.checkbox}>
      <label>
        <input
          type="checkbox"
          {...register(`questions[${nestIndex}].answers[${index}].isCorrect` as const)}
        />
        <span className={styles.checkboxIconWrapper}>
          <MdCheck className={styles.checkboxIcon} />
        </span>
        {label}
      </label>
    </div>
  );
};

export default FormCheckboxComponent;
