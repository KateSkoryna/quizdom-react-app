import { Form } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormCheckboxComponent from "./formCheckboxComponent";
import styles from "../../styles/components/quizForm.module.scss";
import { MdDeleteOutline, MdAdd } from "react-icons/md";
import addClassnameToText from "../../utils/addClassnameToText";

const MAX_ANSWERS = 4;
const MIN_ANSWERS = 2;

const AnswersFormComponent = ({ nestIndex }: { nestIndex: number }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: answers,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `questions[${nestIndex}].answers`,
  });

  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>Answers</legend>
      <div className={styles.answersGrid}>
        {answers.map((answer, index) => {
          // @ts-ignore
          const error = errors?.questions?.[nestIndex]?.answers?.[index]?.answer?.message as string;
          return (
            <div key={answer.id} className={styles.answerTile}>
              <Form.Control
                {...register(`questions[${nestIndex}].answers[${index}].answer`, {
                  required: "Answer is required",
                  minLength: {
                    value: 3,
                    message: "Answer must be at least 4 characters",
                  },
                } as const)}
                as="textarea"
                rows={2}
                className={styles.textarea}
                placeholder={`Answer ${index + 1}`}
                aria-label={`Question ${nestIndex + 1}, answer ${index + 1}`}
              />
              {error && addClassnameToText("text-danger", error)}
              <div className={styles.answerFooter}>
                <FormCheckboxComponent label="Correct answer" nestIndex={nestIndex} index={index} />
                {answers.length > MIN_ANSWERS && (
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => remove(index)}
                    aria-label={`Remove answer ${index + 1}`}
                  >
                    <MdDeleteOutline aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {answers.length < MAX_ANSWERS && (
        <button
          type="button"
          className={styles.addAnswerButton}
          onClick={() => append({ answer: "", isCorrect: false })}
        >
          <MdAdd aria-hidden="true" />
          Add answer
        </button>
      )}
    </fieldset>
  );
};

export default AnswersFormComponent;
