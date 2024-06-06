import { Button, Form } from "react-bootstrap";
import { useFieldArray, useFormContext } from "react-hook-form";

export const AnswersFormComponent = ({ nestIndex }: { nestIndex: number }) => {
  const { control, register, getValues } = useFormContext();

  console.log(getValues());

  console.log(nestIndex);
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
      {answers.map((answer, index) => (
        <Form.Group
          className="mb-3"
          controlId={`answer-${index}-${answer.id}`}
          key={answer.id}
        >
          <Form.Control
            {...register(`questions[${nestIndex}].answers[${index}].answer`, {
              required: "Answer is required",
              minLength: 8,
            } as const)}
            type="text"
            placeholder="Add answer ..."
            key={answer.id}
          />
          <Form.Group
            className="mb-3"
            controlId={`isCorrect-${index}-${answer.id}`}
          >
            <Form.Check
              {...register(
                `questions[${nestIndex}].answers[${index}].isCorrect` as const
              )}
              label="Choose correct answer"
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
