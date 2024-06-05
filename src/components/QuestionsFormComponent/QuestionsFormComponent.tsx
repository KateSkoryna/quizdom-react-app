import { useFieldArray, useFormContext } from "react-hook-form";
import { AnswersFormComponent } from "../AnswersFormComponent/AnswersFormComponent";
import { Button, Form } from "react-bootstrap";

export const QuestionsFormComponent = () => {
  const { control, register } = useFormContext();
  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control: control,
    name: "questions",
  });

  return (
    <Form.Group className="mb-3" controlId="div-questions">
      {questions.map((question, index) => (
        <Form.Group
          key={question.id}
          className="mb-3"
          controlId={`question-${index}`}
        >
          <Form.Label>Question {index + 1}</Form.Label>
          <Form.Control
            {...register(`questions.${index}.questionTitle` as const)}
            type="text"
            placeholder="Add question ..."
          />
          <Form.Text className="text-muted">Add your answers</Form.Text>
          <AnswersFormComponent nestIndex={index} />
          {index > 0 && (
            <Button onClick={() => remove(index)}>Remove Question</Button>
          )}
        </Form.Group>
      ))}
      <Button onClick={() => append({ questionTitle: "" })}>
        Add Question
      </Button>
    </Form.Group>
  );
};
