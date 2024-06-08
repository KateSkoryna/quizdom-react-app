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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const error = errors?.questions?.[index]?.questionTitle?.message;
        return (
          <Form.Group
            key={question.id}
            className="mb-3"
            controlId={`question-${index}`}
          >
            <div className="d-flex justify-content-between mb-3">
              <Form.Label className="mb-0 align-self-center">
                Question {index + 1}
              </Form.Label>
              {index > 0 && (
                <Button onClick={() => remove(index)}>Remove Question</Button>
              )}
            </div>

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
              ? addClassnameToText("text-danger", error)
              : addClassnameToText(styles.errorText)}
            <AnswersFormComponent nestIndex={index} />
          </Form.Group>
        );
      })}
      <Form.Group className="text-center">
        <Button
          onClick={() =>
            append({
              questionTitle: "",
              answers: [
                { answer: "", isCorrect: false },
                { answer: "", isCorrect: false },
              ],
            })
          }
        >
          Add Question
        </Button>
      </Form.Group>
    </Form.Group>
  );
};
