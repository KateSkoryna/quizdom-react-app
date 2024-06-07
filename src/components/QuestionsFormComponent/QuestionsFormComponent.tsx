import { useFieldArray, useFormContext } from "react-hook-form";
import { AnswersFormComponent } from "../AnswersFormComponent/AnswersFormComponent";
import { Button, Form } from "react-bootstrap";
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "./QuestionsFormComponent.module.css";

export const QuestionsFormComponent = () => {
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
    <Form.Group className="mb-3" controlId="div-questions">
      {questions.map((question, index) => {
        // @ts-ignore
        const error = errors?.questions?.[index]?.questionTitle?.message
        return (
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
              })}
              type="text"
              placeholder="Add question ..."
            />
            {error
              ? addClassnameToText(
                "text-danger",
                error
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
        )
      })}
      <Button onClick={() => append({ questionTitle: "" })}>
        Add Question
      </Button>
    </Form.Group>
  );
};
