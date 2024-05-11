import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useForm, Controller, FieldErrors } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay } from "react-icons/fa";

interface FormValues {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

export const SignupPage = () => {
  const initState = {
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  };

  const [initialValues, setInitialValues] = useState(initState);

  const onSubmit = (values: FormValues): void => {
    setInitialValues(values);
    console.log("Values:::", JSON.stringify(values));
  };

  const onError = (errors: FieldErrors<FormValues>): void => {
    console.log("ERROR:::", errors);
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initialValues,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(">>", value, name, type);
      // {1: '1', 2: '9'} '2' 'change'
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicName">
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
        <Form.Group className="mb-3" controlId="formBasicDateofBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                showIcon
                icon={<FaCalendarDay />}
                toggleCalendarOnIconClick
                isClearable
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
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

        <Form.Group className="mb-3" controlId="confirmBasicPassword">
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
