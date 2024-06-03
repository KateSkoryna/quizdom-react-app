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
import { useAuth } from "../../context/AuthContext";
import { FormRangeComponent } from "../FormRangeComponent/FormRangeComponent";
import { FormCategoryComponent } from "../FormCategoryComponent/FormCategoryComponent";

const initState: QuizFormState = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      questionTitle: "",
      answers: [
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit">Save Changes</Button>
      </Form>
    </FormProvider>
  );
};
