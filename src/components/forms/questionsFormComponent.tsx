import { useFieldArray, useFormContext } from "react-hook-form";
import AnswersFormComponent from "./answersFormComponent";
import { Form } from "react-bootstrap";
import styles from "../../styles/components/quizForm.module.scss";
import { MdAdd, MdDeleteOutline, MdLightbulbOutline } from "react-icons/md";
import addClassnameToText from "../../utils/addClassnameToText";

const QuestionsFormComponent = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control: control,
    name: "questions",
  });

  return (
    <div className={styles.questions}>
      {questions.map((question, index) => {
        // @ts-ignore
        const error = errors?.questions?.[index]?.questionTitle?.message;
        return (
          <section
            key={question.id}
            className={styles.questionCard}
            aria-label={`Question ${index + 1}`}
          >
            <div className={styles.questionHeader}>
              <Form.Label htmlFor={`question-${index}`} className={styles.questionLabel}>
                <span className={styles.questionNumber} aria-hidden="true">
                  {index + 1}
                </span>
                Question {index + 1}
              </Form.Label>
              {index > 0 && (
                <button type="button" className={styles.ghostButton} onClick={() => remove(index)}>
                  <MdDeleteOutline aria-hidden="true" />
                  Remove
                </button>
              )}
            </div>

            <div className={styles.field}>
              <Form.Control
                id={`question-${index}`}
                className={styles.textarea}
                {...register(`questions[${index}].questionTitle`)}
                as="textarea"
                rows={2}
                placeholder="What would you like to ask?"
              />
              {error && addClassnameToText("text-danger", error)}
            </div>

            <Form.Group className={styles.field} controlId={`hint-${index}`}>
              <Form.Label className={styles.label}>
                Hint <span className={styles.optional}>(optional)</span>
              </Form.Label>
              <div className={styles.hintField}>
                <MdLightbulbOutline aria-hidden="true" />
                <Form.Control
                  className={styles.input}
                  {...register(`questions[${index}].hint`)}
                  placeholder="A nudge in the right direction, without giving the answer away"
                />
              </div>
            </Form.Group>

            <AnswersFormComponent nestIndex={index} />
          </section>
        );
      })}
      <button
        type="button"
        className={styles.addQuestionButton}
        onClick={() =>
          append({
            questionTitle: "",
            hint: "",
            answers: [
              { answer: "", isCorrect: false },
              { answer: "", isCorrect: false },
            ],
          })
        }
      >
        <MdAdd aria-hidden="true" />
        Add question
      </button>
    </div>
  );
};

export default QuestionsFormComponent;
