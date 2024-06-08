import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import {
  QuizFormState,
  Complexity,
  QuizCategory,
  QuizFormProps,
} from "../../types/types";
import { Button, Container } from "react-bootstrap";
import { FormRangeComponent } from "../FormRangeComponent/FormRangeComponent";
import { FormCategoryComponent } from "../FormCategoryComponent/FormCategoryComponent";
import { QuestionsFormComponent } from "../QuestionsFormComponent/QuestionsFormComponent";
import addClassnameToText from "../../helpers/addClassnameToText";
import styles from "./QuizFormComponent.module.css";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const defaultValues: QuizFormState = {
  title: "",
  description: "",
  complexity: Complexity.BEGINNER,
  category: QuizCategory.JS,
  questions: [
    {
      questionTitle: "",
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
      ],
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
    formState: { errors, isDirty, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: QuizFormState): Promise<void> => {
    try {
      await addDoc(collection(db, "quizes"), {
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

  const errorTitle = errors.title?.message;
  const errorDescription = errors.description?.message;

  return (
    <Container>
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
            {(errorTitle as string)
              ? addClassnameToText("text-danger", errorTitle as string)
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
            {(errorDescription as string)
              ? addClassnameToText("text-danger", errorDescription as string)
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <FormRangeComponent fieldName="complexity" />
          <FormCategoryComponent fieldName="category" />
          <h5 className="mx-auto mb-3 mt-3 text-center">Add your questions</h5>
          <QuestionsFormComponent />
          <div className="d-flex justify-content-center">
            <Button className="me-3" variant="secondary" onClick={handleClose}>
              Close Quiz
            </Button>
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save Quiz"}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </Container>
  );
};
