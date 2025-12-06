import { useFieldArray, useFormContext } from "react-hook-form";
import AnswersFormComponent from "./answersFormComponent";
import { Form } from "react-bootstrap";
import addClassnameToText from "../../helpers/addClassnameToText";
import modalStyles from "../../styles/components/modal.module.scss";
import { RiAddLine } from "react-icons/ri";
import { IoMdRemove } from "react-icons/io";

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
              <Form.Label
                className={`mb-0 align-self-center ${modalStyles.questionLabel}`}
              >
                Question {index + 1}
              </Form.Label>
              {index > 0 && (
                <button
                  type="button"
                  className={modalStyles.addQuestionButton}
                  onClick={() => remove(index)}
                >
                  <IoMdRemove />
                  <span>Remove Question</span>
                </button>
              )}
            </div>

            <Form.Control
              className={modalStyles.formInput}
              {...register(`questions[${index}].questionTitle`, {
                required: "Question title is required",
                minLength: {
                  value: 4,
                  message: "Question title must be at least 4 characters",
                },
              })}
              type="text"
              placeholder="Question Text"
            />
            {error && addClassnameToText("text-danger", error)}
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
              answers: [
                { answer: "", isCorrect: false },
                { answer: "", isCorrect: false },
              ],
            })
          }
        >
          <RiAddLine />
          <span>Add Question</span>
        </button>
      </div>
    </Form.Group>
  );
};

export default QuestionsFormComponent;
