import { useFieldArray, useFormContext } from "react-hook-form";
import { AnswersFormComponent } from "../AnswersFormComponent/AnswersFormComponent";
import { Button, Form } from "react-bootstrap";
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "./QuestionsFormComponent.module.css";
import { FormContextType } from "../../types/types";


export const QuestionsFormComponent = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormContextType>();
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
            {...register(`questions[${index}].questionTitle`, {
              required: "Question title is required",
              minLength: {
                value: 4,
                message: "Question title must be at least 4 characters",
              },
            } as const)}
            type="text"
            placeholder="Add question ..."
          />
          {(errors?.questions?.[index]?.questionTitle?.message as string)
            ? addClassnameToText(
                "text-danger",
                errors?.questions?.[index]?.questionTitle.message as string
              )
            : addClassnameToText(styles.errorText)}
          <Form.Text className="text-muted">
            Add answers to your question
          </Form.Text>
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
