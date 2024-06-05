import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import {
  QuizFormState,
  Complexity,
  QuizCategory,
  QuizFormProps,
  Question,
} from "../../types/types";
import { Button } from "react-bootstrap";
import { FormRangeComponent } from "../FormRangeComponent/FormRangeComponent";
import { FormCategoryComponent } from "../FormCategoryComponent/FormCategoryComponent";
import { v4 as uuid } from "uuid";

const initState: QuizFormState = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      id: uuid(),
      question: "",
    },
  ],
  answers: [
    { id: uuid(), answer: "", isCorrect: false },
    { id: uuid(), answer: "", isCorrect: false },
    { id: uuid(), answer: "", isCorrect: false },
    { id: uuid(), answer: "", isCorrect: false },
  ],
};

export const QuizFormComponent = ({ handleClose }: QuizFormProps) => {
  const [, setFormData] = useState<QuizFormState>(initState);

  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initState,
  });

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control: methods.control,
    name: "questions",
  });

  const { fields: answers } = useFieldArray({
    control: methods.control,
    name: "answers",
  });

  const addQuestion = () => {
    const question: Question = {
      id: uuid(),
      question: "",
    };

    console.log(answers);
    console.log(question);

    append(question);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      return;
    }
    remove(index);
  };

  const handleFormSubmit = (data: QuizFormState) => {
    console.log(data);
    setFormData(data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            {...methods.register("title")}
            type="text"
            placeholder="Best Quiz ever..."
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Quiz Description</Form.Label>
          <Form.Control
            {...methods.register("description")}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <FormRangeComponent fieldName="complexity" />
        <FormCategoryComponent fieldName="category" />
        <Form.Group className="mb-3" controlId="questions">
          <Form.Text className="text-muted">Add your questions</Form.Text>
          {questions.map((field, index) => (
            <Form.Group>
              <Form.Group
                className="mb-3"
                controlId={`question-${index}`}
                key={field.id}
              >
                <Form.Label>Question {index + 1}</Form.Label>
                <Form.Control
                  {...methods.register(`questions.${index}.question` as const)}
                  type="text"
                  placeholder="Add question ..."
                />
                <Form.Group className="mb-3" controlId="answers">
                  <Form.Text className="text-muted">Add your answers</Form.Text>
                  {answers.map((answer, index) => (
                    <Form.Group
                      className="mb-3"
                      controlId={`answer-${field.id}-${index}`}
                      key={answer.id}
                    >
                      <Form.Control
                        {...methods.register(
                          `answers.${index}.answer` as const
                        )}
                        type="text"
                        placeholder="Add answer ..."
                      />
                      <Form.Check
                        {...methods.register(
                          `answers.${index}.isCorrect` as const
                        )}
                        id={`checkbox-isCorrect-${field.id}`}
                        label="Choose correct answer"
                      />
                    </Form.Group>
                  ))}
                </Form.Group>
                {index > 0 && (
                  <Button onClick={() => removeQuestion(index)}>
                    Remove Question
                  </Button>
                )}
              </Form.Group>
            </Form.Group>
          ))}
          <Button type="button" onClick={addQuestion}>
            Add Question
          </Button>
        </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit">Save Changes</Button>
      </Form>
    </FormProvider>
  );
};
