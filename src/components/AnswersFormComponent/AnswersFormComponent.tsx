import { Button, Form } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormCheckboxComponent } from "../FormCheckboxComponent/FormCheckboxComponent";
import { FormContextType } from "../../types/types";
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "./AnswersFormComponent.module.css";

export const AnswersFormComponent = ({ nestIndex }: { nestIndex: number }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormContextType>();

  const {
    fields: answers,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `questions[${nestIndex}].answers`,
  });

  console.log(errors);

  return (
    <Form.Group className="mb-3" controlId="div-questions">
      {answers.map((answer, index) => (
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
          {errors?.questions?.[nestIndex]?.answers?.[index]?.answer?.message
            ? addClassnameToText(
                "text-danger",
                errors?.questions?.[nestIndex]?.answers?.[index]?.answer
                  ?.message as string
              )
            : addClassnameToText(styles.errorText)}
          <Form.Group
            className="mb-3"
            controlId={`isCorrect-${index}-${answer.id}`}
          >
            <FormCheckboxComponent
              label="Choose correct answer"
              nestIndex={nestIndex}
              index={index}
            />
          </Form.Group>
          <Button type="button" onClick={() => remove(index)}>
            Remove
          </Button>
        </Form.Group>
      ))}
      <Button
        type="button"
        onClick={() => append({ answer: "", isCorrect: false })}
      >
        Add Answer
      </Button>
    </Form.Group>
  );
};
