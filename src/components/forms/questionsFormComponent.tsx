import { useFieldArray, useFormContext } from "react-hook-form";
import AnswersFormComponent from "./answersFormComponent";
import { Form } from "react-bootstrap";
import modalStyles from "../../styles/components/modal.module.scss";
import { MdAdd, MdRemove } from "react-icons/md";
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
    <Form.Group className="mb-3" controlId="div-questions">
      {questions.map((question, index) => {
        // @ts-ignore
        const error = errors?.questions?.[index]?.questionTitle?.message;
        return (
          <Form.Group
            key={question.id}
            className={modalStyles.questionContainer}
            controlId={`question-${index}`}
          >
            <div className="d-flex justify-content-between mb-3">
              <Form.Label className={`mb-0 align-self-center ${modalStyles.questionLabel}`}>
                Question {index + 1}
              </Form.Label>
              {index > 0 && (
                <button
                  type="button"
                  className={modalStyles.addQuestionButton}
                  onClick={() => remove(index)}
                >
                  <MdRemove />
                  <span>Remove Question</span>
                </button>
              )}
            </div>

            <Form.Control
              className={modalStyles.formTextarea}
              {...register(`questions[${index}].questionTitle`)}
              as="textarea"
              rows={2}
              type="text"
              placeholder="Question Text"
            />
            {error && addClassnameToText("text-danger", error)}

            <Form.Group className="mt-3" controlId={`hint-${index}`}>
              <Form.Label className={modalStyles.formLabel}>Hint (optional)</Form.Label>
              <Form.Control
                className={modalStyles.formInput}
                {...register(`questions[${index}].hint`)}
                placeholder="Add a helpful hint for this question..."
              />
            </Form.Group>

            <AnswersFormComponent nestIndex={index} />
          </Form.Group>
        );
      })}
      <div className={modalStyles.addQuestionContainer}>
        <button
          type="button"
          className={modalStyles.addQuestionButton}
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
          <MdAdd />
          <span>Add Question</span>
        </button>
      </div>
    </Form.Group>
  );
};

export default QuestionsFormComponent;
