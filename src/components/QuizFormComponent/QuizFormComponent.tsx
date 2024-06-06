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
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "./QuizFormComponent.module.css";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

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
    mode: "onChange",
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = methods;

  const handleFormSubmit = async (data: QuizFormState): Promise<void> => {
    try {
      const quizRef = doc(db, "quizzes", auth.currentUser!.uid);
      await setDoc(quizRef, {
        ...data,
        author: auth.currentUser!.uid,
      });
      setFormData(data);
      reset();
    } catch (error) {
      setError("root", {
        message: "Failed to create a quiz",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3" controlId="div-title">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            {...register("title", {
              required: "Title is required",
              minLength: 8,
            })}
            type="text"
            placeholder="Best Quiz ever..."
            autoFocus
          />
          {errors.title
            ? addClassnameToText("text-danger", errors.title.message)
            : addClassnameToText(styles.errorText)}
        </Form.Group>
        <Form.Group className="mb-3" controlId="div-description">
          <Form.Label>Quiz Description</Form.Label>
          <Form.Control
            {...register("description", {
              required: "Description is required",
              minLength: 8,
            })}
            as="textarea"
            rows={3}
          />
          {errors.description
            ? addClassnameToText("text-danger", errors.description.message)
            : addClassnameToText(styles.errorText)}
        </Form.Group>
        <FormRangeComponent fieldName="complexity" />
        <FormCategoryComponent fieldName="category" />
        <Form.Text className="text-muted">Add your questions</Form.Text>
        <QuestionsFormComponent />
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" disabled={!isDirty}>
          Save Changes
        </Button>
      </Form>
    </FormProvider>
  );
};
