import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import {
  QuizFormState,
  Complexity,
  QuizCategory,
  QuizFormProps,
} from "../../types/types";
import { QUIZ_CATEGORY } from "../../const/const";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

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
          isCorrect: true,
        },
      ],
    },
  ],
};

export const QuizFormComponent = ({ handleClose }: QuizFormProps) => {
  const [formData, setFormData] = useState<QuizFormState>(initState);
  const entries = Object.entries(QUIZ_CATEGORY);

  const { currentUser } = useAuth();

  const { register, handleSubmit } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initState,
  });

  const handleFormSubmit = (data: QuizFormState) => {
    console.log(currentUser?.id);
    console.log(formData);
    setFormData(data);
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Quiz Title</Form.Label>
        <Form.Control
          {...register("title")}
          type="text"
          placeholder="Best Quiz ever..."
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Quiz Description</Form.Label>
        <Form.Control {...register("description")} as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="complexity">
        <Form.Label>Complexity level</Form.Label>
        <Form.Range
          {...register("complexity")}
          min={0}
          max={10}
          step={5}
          value={0}
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Select
          className="form-select-custom"
          aria-label="Default select example"
          {...register("category")}
        >
          <option>Choose a category</option>
          {entries.map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button type="submit">Save Changes</Button>
    </Form>
  );
};
