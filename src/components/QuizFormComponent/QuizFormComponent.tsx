import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import {
  QuizFormState,
  Complexity,
  QuizCategory,
  QuizFormProps,
} from "../../types/types";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
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
      questionTitle: "",
      answers: [
        { id: 1, answer: "", isCorrect: false },
        { id: 2, answer: "", isCorrect: false },
        { id: 3, answer: "", isCorrect: false },
        { id: 4, answer: "", isCorrect: false },
      ],
    },
  ],
};

export const QuizFormComponent = ({ handleClose }: QuizFormProps) => {
  const [formData, setFormData] = useState<QuizFormState>(initState);

  const { currentUser } = useAuth();

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

  const addQuestion = () => {
    const question = {
      id: uuid(),
      questionTitle: "",
      answers: [
        { id: 1, answer: "", isCorrect: false },
        { id: 2, answer: "", isCorrect: false },
        { id: 3, answer: "", isCorrect: false },
        { id: 4, answer: "", isCorrect: false },
      ],
    };
    append(question);

    console.log(questions);
  };

  const removeQuestion = (index: number) => {
    console.log(index);
    if (questions.length === 1) {
      return;
    }
    remove(index);
  };

  const handleFormSubmit = (data: QuizFormState) => {
    console.log(currentUser?.id);
    console.log(data);
    setFormData(data);
    console.log(formData);
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
            <>
              <Form.Group
                className="mb-3"
                controlId={`question-${index}`}
                key={field.id}
              >
                <Form.Label>Question {index + 1}</Form.Label>
                <Form.Control
                  {...methods.register(
                    `questions.${index}.questionTitle` as const
                  )}
                  type="text"
                  placeholder="Add question ..."
                />
                <Form.Group className="mb-3" controlId="answers">
                  <Form.Text className="text-muted">Add your answers</Form.Text>
                  {field.answers.map((answer, index) => (
                    <Form.Group
                      className="mb-3"
                      controlId={`answer-${field.id}-${index}`}
                      key={answer.id}
                    >
                      <Form.Control
                        {...methods.register(
                          `questions.${index}.answers.${index}.answer` as const
                        )}
                        type="text"
                        placeholder="Add answer ..."
                      />
                      <Form.Check
                        {...methods.register(
                          `questions.${index}.answers.${index}.isCorrect` as const
                        )}
                        id={`checkbox-isCorrect-${field.id}-${index}`}
                        label="Choose correct answer"
                      ></Form.Check>
                    </Form.Group>
                  ))}
                </Form.Group>
                {index > 0 && (
                  <Button onClick={() => removeQuestion(index)}>
                    Remove Question
                  </Button>
                )}
              </Form.Group>
            </>
          ))}
          <Button onClick={addQuestion}>Add Question</Button>
        </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit">Save Changes</Button>
      </Form>
    </FormProvider>
  );
};
