import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "../../store/AuthStore";
import { UserData } from "../../../shared/types";
import ForgotPasswordModal from "../modal/forgotPasswordModal";
import styles from "../../styles/pages/auth.module.scss";
import eyeIcon from "../../assets/eye.svg";
import * as yup from "yup";
import { ensureUserDocument } from "../../utils/authHelper";
import addClassnameToText from "../../utils/addClassnameToText";

export const loginSchema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();

type AuthMode = "login" | "signup";

type AuthFormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const initLoginState: AuthFormData = {
  email: "",
  password: "",
};

const initSignupState: AuthFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const UnifiedAuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<AuthFormData>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: mode === "login" ? initLoginState : initSignupState,
    resolver: yupResolver(mode === "login" ? loginSchema : signupSchema),
  });

  const passwordValue = watch("password");

  const toggleMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
    setShowPassword(false);
  };

  const onSubmit = async (values: AuthFormData): Promise<void> => {
    try {
      if (mode === "login") {
        await login(values.email, values.password);
        navigate("/user");
      } else {
        const userCredential = await signup(values as UserData);

        try {
          await ensureUserDocument("email", {
            name: values.name!,
            email: values.email,
          });
          navigate("/user");
        } catch (firestoreError: unknown) {
          // Rollback: Delete the Firebase Auth user if Firestore creation fails
          try {
            await userCredential.user.delete();
          } catch (deleteError) {
            console.error("Failed to rollback user creation:", deleteError);
          }
          throw new Error("Failed to create user profile");
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { code?: string }).code || "";
      const errorCode = (error as { code?: string }).code || "";

      if (mode === "login") {
        setError("root", {
          message: "Invalid email or password",
        });
      } else {
        if (
          errorMessage === "EMAIL_EXISTS" ||
          errorCode === "auth/email-already-in-use" ||
          errorCode === "auth/invalid-email"
        ) {
          setError("root", {
            message: "Something is wrong with email or password",
          });
        } else {
          setError("root", {
            message: errorMessage || "Failed to create an account",
          });
        }
      }
    }
  };

  return (
    <Form key={mode} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <p className="text-danger mb-3 text-center">{errors.root.message}</p>
      )}

      {mode === "signup" && (
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name
            ? addClassnameToText("text-danger", errors.name?.message as string)
            : addClassnameToText(styles.errorText)}
        </Form.Group>
      )}

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
            {errors.email?.message as string}
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
            autoComplete={mode === "login" ? "current-password" : "password"}
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
            {errors.password?.message as string}
          </Form.Text>
        ) : (
          <Form.Text className={styles.errorText}>Empty space</Form.Text>
        )}
      </Form.Group>

      {mode === "signup" && (
        <Form.Group controlId="confirmBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword
            ? addClassnameToText(
                "text-danger",
                errors.confirmPassword?.message as string
              )
            : addClassnameToText(styles.errorText)}
        </Form.Group>
      )}

      {mode === "login" && (
        <button
          type="button"
          className={styles.forgetPassword}
          onClick={() => setShowForgotPassword(true)}
        >
          Forget password?
        </button>
      )}

      <Button variant="primary" type="submit" className={styles.formBtn}>
        {mode === "login" ? "Login" : "Sign Up"}
      </Button>

      <button type="button" className={styles.toggleMode} onClick={toggleMode}>
        {mode === "login" ? (
          <>
            <span className={styles.toggleText}>Don't have an account? </span>
            <span className={styles.toggleLink}>Sign up</span>
          </>
        ) : (
          <>
            <span className={styles.toggleText}>Already have an account? </span>
            <span className={styles.toggleLink}>Log in</span>
          </>
        )}
      </button>

      {mode === "login" && showForgotPassword && (
        <ForgotPasswordModal
          show={showForgotPassword}
          handleClose={() => setShowForgotPassword(false)}
        />
      )}
    </Form>
  );
};

export default UnifiedAuthForm;
