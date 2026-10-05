import { useFormContext } from "react-hook-form";
import styles from "../../styles/components/quizForm.module.scss";
import { MdCheck } from "react-icons/md";

type FormCheckboxProps = {
  label: string;
  nestIndex: number;
  index: number;
};

const FormCheckboxComponent = ({ label, nestIndex, index }: FormCheckboxProps) => {
  const { register } = useFormContext();
  return (
    <label className={styles.correctToggle}>
      <input
        type="checkbox"
        {...register(`questions[${nestIndex}].answers[${index}].isCorrect` as const)}
      />
      <span className={styles.toggleBox} aria-hidden="true">
        <MdCheck />
      </span>
      {label}
    </label>
  );
};

export default FormCheckboxComponent;
