import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { UserData } from "../../types/types";
import styles from "./SignupPage.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const initState = {
  name: "",
  email: "",
  dateOfBirth: new Date(),
  gender: "",
  password: "",
  confirmPassword: "",
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    dateOfBirth: yup
      .date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
      .required("Date of Birth is required"),
    gender: yup.string().required("Gender is required"),
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();

export const SignupPage = () => {
  const [userData, setUserData] = useState(initState);

  const onSubmit = (values: UserData): void => {
    setUserData(values);
    reset(userData);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: userData,
    resolver: yupResolver(schema),
  });

  return (
    <Container className={styles.signupSection}>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>Signup Form</h2>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            {...register("name")}
          />

          {errors.name ? (
            <Form.Text className="text-danger">{errors.name.message}</Form.Text>
          ) : (
            <Form.Text className={styles.errorText}>Empty space</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email ? (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          ) : (
            <Form.Text className={styles.errorText}>Empty space</Form.Text>
          )}
        </Form.Group>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Group className="mb-4" controlId="formBasicDateofBirth">
              <Form.Label className="d-block">Date of Birth</Form.Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    showIcon
                    icon={<FaCalendarDay />}
                    toggleCalendarOnIconClick
                    popperPlacement="bottom-start"
                    className={styles.formDateInput}
                    showYearDropdown
                    scrollableYearDropdown
                    maxDate={subYears(new Date(), 18)}
                    minDate={subYears(new Date(), 100)}
                    dropdownMode="select"
                    showMonthDropdown
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                  />
                )}
              />
              {errors.dateOfBirth ? (
                <Form.Text className="text-danger">
                  {errors.dateOfBirth.message}
                </Form.Text>
              ) : (
                <Form.Text className={styles.errorText}>Empty space</Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Group className="mb-4" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                className="form-select-custom"
                aria-label="Default select example"
                {...register("gender")}
              >
                <option>Choose your identity</option>
                <option value="human">Human</option>
                <option value="animal">Animal</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
              </Form.Select>
              {errors.gender ? (
                <Form.Text className="text-danger">
                  {errors.gender.message}
                </Form.Text>
              ) : (
                <Form.Text className={styles.errorText}>Empty space</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            autoComplete="password"
            {...register("password")}
          />
          {errors.password ? (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          ) : (
            <Form.Text className={styles.errorText}>Empty space</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="confirmBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
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
