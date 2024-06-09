import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginUser } from "../../types/types";
import styles from "./LoginPage.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../helpers/schema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FormFooter } from "../../components/FormFooter/FormFooter";
import { auth } from "../../firebase";
import bcrypt from "bcryptjs-react";
import { getUser } from "../../API/api";

const initState = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [currentFormData, setCurrentFormData] = useState(initState);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (values: LoginUser): Promise<void> => {
    try {
      await login(values.email, values.password);
      setCurrentFormData(values);
      const user = await getUser(auth.currentUser!.uid);
      if (user) {
        const comparedPassword = bcrypt.compareSync(
          values.password,
          user.data()?.password
        );
        if (comparedPassword && user) {
          navigate("/user");
        }
      }
    } catch (error) {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: currentFormData,
    resolver: yupResolver(loginSchema),
  });

  return (
    <Container className={styles.loginSection}>
      <Card className={styles.loginCard}>
        <h2 className={styles.formTitle}>Log In</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <FormFooter
            mainText="Dont have an account? "
            text="Sign Up"
            path="/signup"
          />
        </Form>
      </Card>
    </Container>
  );
};
