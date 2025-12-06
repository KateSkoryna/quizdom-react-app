import { Form } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormCheckboxComponent from "./formCheckboxComponent";
import addClassnameToText from "../../helpers/addClassnameToText";
import modalStyles from "../../styles/components/modal.module.scss";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

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
    <Form.Group className="mt-3" controlId="div-questions">
      <div className={modalStyles.answersGrid}>
        {answers.map((answer, index) => {
          // @ts-ignore
          const error = errors?.questions?.[nestIndex]?.answers?.[index]?.answer
            ?.message as string;
          return (
            <div key={answer.id}>
              <Form.Control
                {...register(
                  `questions[${nestIndex}].answers[${index}].answer`,
                  {
                    required: "Answer is required",
                    minLength: {
                      value: 3,
                      message: "Answer must be at least 4 characters",
                    },
                  } as const
                )}
                as="textarea"
                className={modalStyles.answerInput}
                placeholder={`Answer ${index + 1}`}
              />
              {error && addClassnameToText("text-danger", error)}
              <Form.Group
                className="d-flex justify-content-between mt-2"
                controlId={`isCorrect-${index}-${answer.id}`}
              >
                <FormCheckboxComponent
                  label="Choose correct answer"
                  nestIndex={nestIndex}
                  index={index}
                />
                {answers.length > 2 && (
                  <button
                    type="button"
                    className={modalStyles.removeQuestionButton}
                    onClick={() => remove(index)}
                  >
                    <MdDeleteOutline />
                  </button>
                )}
              </Form.Group>
            </div>
          );
        })}
      </div>
      {answers.length < 4 && (
        <button
          type="button"
          className={modalStyles.addAnswerButton}
          onClick={() => append({ answer: "", isCorrect: false })}
        >
          <IoIosAddCircleOutline />
          <span>Add Answer</span>
        </button>
      )}
    </Form.Group>
  );
};

export default AnswersFormComponent;
