import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm, Controller } from "react-hook-form";
import { UserData } from "../../types/types";
import styles from "./SignupPage.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../helpers/schema";
import { AvatarGenerator } from "random-avatar-generator";
import { useAuth } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FormFooter } from "../../components/FormFooter/FormFooter";
import { DatePickerComponent } from "../../components/DatePickerComponent/DatePickerComponent";

const initState = {
  name: "",
  email: "",
  dateOfBirth: new Date(),
  gender: "",
  password: "",
  confirmPassword: "",
};

const addClassnameToText = (classNameText: string, message = "No errors") => {
  return <Form.Text className={classNameText}>{message}</Form.Text>;
};

export const SignupPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const generator = new AvatarGenerator();
  const avatar = generator.generateRandomAvatar();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: UserData): Promise<void> => {
    try {
      await signup(values);
      const ref = doc(db, "users", auth.currentUser!.uid);
      await setDoc(ref, {
        name: values.name,
        email: values.email,
        avatar: avatar,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        password: values.password,
      });
      setUserData(values);
      if (userData) {
        reset(userData);
      }
      navigate("/user");
    } catch (error) {
      setError("root", {
        message: "Faid to create an account",
      });
    }
  };

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initState,
    resolver: yupResolver(signupSchema),
  });

  return (
    <Container className={styles.signupSection}>
      <Card className={styles.signupCard}>
        <h2 className={styles.formTitle}>Signup Form</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name
              ? addClassnameToText("text-danger", errors.name.message)
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email
              ? addClassnameToText("text-danger", errors.email.message)
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-2" controlId="formBasicDateofBirth">
                <Form.Label className="d-block">Date of Birth</Form.Label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePickerComponent value={value} callback={onChange} />
                  )}
                />
                {errors.dateOfBirth
                  ? addClassnameToText(
                      "text-danger",
                      errors.dateOfBirth.message
                    )
                  : addClassnameToText(styles.errorText)}
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-2" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  className="form-select-custom"
                  aria-label="Default select example"
                  {...register("gender")}
                >
                  <option>Choose your identity</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
                {errors.gender
                  ? addClassnameToText("text-danger", errors.gender.message)
                  : addClassnameToText(styles.errorText)}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              autoComplete="password"
              {...register("password")}
            />
            {errors.password
              ? addClassnameToText("text-danger", errors.password.message)
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <Form.Group className="mb-2" controlId="confirmBasicPassword">
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
                  errors.confirmPassword.message
                )
              : addClassnameToText(styles.errorText)}
          </Form.Group>
          <Button variant="primary" type="submit" className={styles.formBtn}>
            Submit
          </Button>
          <FormFooter
            mainText="Already have an account? "
            text="Log In"
            path="/login"
          />
        </Form>
      </Card>
    </Container>
  );
};
