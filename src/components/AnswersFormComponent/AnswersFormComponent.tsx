import { Button, Form } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormCheckboxComponent } from "../FormCheckboxComponent/FormCheckboxComponent";
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "./AnswersFormComponent.module.css";

export const AnswersFormComponent = ({ nestIndex }: { nestIndex: number }) => {
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
    <Form.Group className="mb-3" controlId="div-questions">
      {answers.map((answer, index) => {
        // @ts-ignore
        const error = errors?.questions?.[nestIndex]?.answers?.[index]?.answer
          ?.message as string;
        return (
          <Form.Group
            className="mb-3"
            controlId={`answer-${index}-${answer.id}`}
            key={answer.id}
          >
            <Form.Control
              {...register(`questions[${nestIndex}].answers[${index}].answer`, {
                required: "Answer is required",
                minLength: {
                  value: 3,
                  message: "Answer must be at least 4 characters",
                },
              } as const)}
              type="text"
              placeholder="Add answer ..."
              key={answer.id}
            />

            {error
              ? addClassnameToText(
                  "text-danger",

                  error
                )
              : addClassnameToText(styles.errorText)}
            <Form.Group
              className="d-flex justify-content-between"
              controlId={`isCorrect-${index}-${answer.id}`}
            >
              <FormCheckboxComponent
                label="Choose correct answer"
                nestIndex={nestIndex}
                index={index}
              />
              <Button type="button" onClick={() => remove(index)}>
                Remove answer
              </Button>
            </Form.Group>
          </Form.Group>
        );
      })}
      <Button
        type="button"
        onClick={() => append({ answer: "", isCorrect: false })}
      >
        Add Answer
      </Button>
    </Form.Group>
  );
};
