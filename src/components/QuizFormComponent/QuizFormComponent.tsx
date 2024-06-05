import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import {
  QuizFormState,
  Complexity,
  QuizCategory,
  QuizFormProps,
} from "../../types/types";
import { Button } from "react-bootstrap";
import { FormRangeComponent } from "../FormRangeComponent/FormRangeComponent";
import { FormCategoryComponent } from "../FormCategoryComponent/FormCategoryComponent";
import { QuestionsFormComponent } from "../QuestionsFormComponent/QuestionsFormComponent";

const defaultValues: QuizFormState = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      questionTitle: "",
      answers: [{ answer: "", isCorrect: false }],
    },
  ],
};

export const QuizFormComponent = ({ handleClose }: QuizFormProps) => {
  const [, setFormData] = useState<QuizFormState>(defaultValues);

  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues,
  });

  const { register, handleSubmit, formState } = methods;

  const handleFormSubmit = (data: QuizFormState) => {
    console.log(data);
    setFormData(data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3" controlId="div-title">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            {...register("title")}
            type="text"
            placeholder="Best Quiz ever..."
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="div-description">
          <Form.Label>Quiz Description</Form.Label>
          <Form.Control {...register("description")} as="textarea" rows={3} />
        </Form.Group>
        <FormRangeComponent fieldName="complexity" />
        <FormCategoryComponent fieldName="category" />
        <Form.Text className="text-muted">Add your questions</Form.Text>
        <QuestionsFormComponent />
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" disabled={!formState.isValid}>
          Save Changes
        </Button>
      </Form>
    </FormProvider>
  );
};
