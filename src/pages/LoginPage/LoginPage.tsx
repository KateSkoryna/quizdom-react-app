import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CurrentUser } from "../../types/types";
import styles from "./LoginPage.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSschema } from "../../helpers/schema";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const initState = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [currentFormData, setCurrentFormData] = useState(initState);
  const navigate = useNavigate();

  const onSubmit = async (values: CurrentUser): Promise<void> => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user);
      setCurrentFormData(values);
      reset(currentFormData);
      navigate("/user/:user_id");
    } catch (error) {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: currentFormData,
    resolver: yupResolver(loginSschema),
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
        <Form.Group controlId="formBasicPassword">
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
        {errors.root ? (
          <Form.Text className="text-danger">{errors.root.message}</Form.Text>
        ) : (
          <Form.Text className={styles.errorText}>Empty space</Form.Text>
        )}
        <Button variant="primary" type="submit" className={styles.formBtn}>
          Submit
        </Button>
        <Form.Text className="d-block ms-auto">
          {`Don't have an account? `}
          <Link className="text-primary" to="/signup">
            Sing up
          </Link>
        </Form.Text>
      </Form>
    </Container>
  );
};
