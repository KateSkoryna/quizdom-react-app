import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CurrentUser } from "../../types/types";
import styles from "./LoginPage.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const initState = {
  email: "",
  password: "",
};

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8),
  })
  .required();

export const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(initState);

  const onSubmit = (values: CurrentUser): void => {
    setCurrentUser(values);
    reset(currentUser);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: currentUser,
    resolver: yupResolver(schema),
  });

  return (
    <Container className={styles.loginSection}>
      <h2 className={styles.formTitle}>Log In</h2>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email ? (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          ) : (
            <Form.Text className={styles.errorText}>Empty space</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            autoComplete="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password ? (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          ) : (
            <Form.Text className={styles.errorText}>Empty space</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.formBtn}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
