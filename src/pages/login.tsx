import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginUser } from "../types/types";
import styles from "../styles/pages/auth.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../helpers/schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { auth } from "../firebase";
import bcrypt from "bcryptjs-react";
import { getCurrentUser } from "../API/api";
import eyeIcon from "../assets/eye.svg";

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [currentFormData, setCurrentFormData] = useState(initState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (values: LoginUser): Promise<void> => {
    try {
      await login(values.email, values.password);
      setCurrentFormData(values);
      if (!auth.currentUser) {
        throw new Error("Authentication failed");
      }
      const user = await getCurrentUser(auth.currentUser.uid);
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
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: currentFormData,
    resolver: yupResolver(loginSchema),
  });

  const passwordValue = watch("password");

  return (
    <Container className={styles.authSection}>
      <div className={styles.bubble3}></div>
      <Card className={styles.authCard}>
        <h2 className={styles.formTitle}>Log In</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email ? (
              <Form.Text className="text-danger mt-1 d-block">
                {errors.email.message}
              </Form.Text>
            ) : (
              <Form.Text className={styles.errorText}>Empty space</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className={styles.passwordWrapper}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={styles.passwordInput}
                {...register("password", { required: "Password is required" })}
              />
              {passwordValue && (
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeBtn}
                  type="button"
                >
                  <img
                    src={eyeIcon}
                    alt={showPassword ? "Hide password" : "Show password"}
                  />
                </button>
              )}
            </div>
            {errors.password ? (
              <Form.Text className="text-danger mt-1 d-block">
                {errors.password.message}
              </Form.Text>
            ) : (
              <Form.Text className={styles.errorText}>Empty space</Form.Text>
            )}
          </Form.Group>
          {errors.root ? (
            <Form.Text className="text-danger mt-1 d-block">
              {errors.root.message}
            </Form.Text>
          ) : (
            <Form.Text className={styles.errorText}>Empty space</Form.Text>
          )}
          <Button variant="primary" type="submit" className={styles.formBtn}>
            Login
          </Button>
          <Button
            variant="outline-primary"
            className={styles.signupBtn}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
