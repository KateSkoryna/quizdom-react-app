import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay } from "react-icons/fa";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { UserData } from "../../types/types";

const initState = {
  name: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  password: "",
  confirmPassword: "",
};

export const SignupPage = () => {
  const [userData, setUserData] = useState(initState);

  const onSubmit = (values: UserData): void => {
    setUserData(values);
    console.log("Values 32", values);
    reset(userData);
  };

  const onError = (errors: FieldErrors<UserData>): void => {
    console.log("ERROR:", errors);
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: userData,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("53", value, name, type);
      // {1: '1', 2: '9'} '2' 'change'
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Container className="signup-section" fluid="md">
      <h2 className="form-title">Signup Form</h2>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-4" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <Form.Text className="text-danger">{errors.name.message}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Group className="mb-4" controlId="formBasicDateofBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    showIcon
                    icon={<FaCalendarDay />}
                    toggleCalendarOnIconClick
                    popperPlacement="bottom-start"
                    className="form-date-input"
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                  />
                )}
              />
              {errors.dateOfBirth && (
                <Form.Text className="text-danger">
                  {errors.dateOfBirth.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Group className="mb-4" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                className="form-select-custom"
                aria-label="Default select example"
                {...register("gender", { required: "Gender is required" })}
              >
                <option>Choose your identity</option>
                <option value="human">Human</option>
                <option value="animal">Animal</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
              </Form.Select>
              {errors.gender && (
                <Form.Text className="text-danger">
                  {errors.gender.message}
                </Form.Text>
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-4" controlId="confirmBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Password is required",
            })}
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
