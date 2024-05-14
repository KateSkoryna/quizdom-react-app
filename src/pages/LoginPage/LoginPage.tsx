import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm, FieldErrors } from "react-hook-form";
import { currentUser } from "../../types/types";

const initState = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(initState);

  const onSubmit = (values: currentUser): void => {
    setCurrentUser(values);
    console.log("Values 32", values);
    reset(currentUser);
  };

  const onError = (errors: FieldErrors<currentUser>): void => {
    console.log("ERROR:", errors);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: currentUser,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("53", value, name, type);
      // {1: '1', 2: '9'} '2' 'change'
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Container className="form-container" fluid="md">
      <h2 className="form-title">Log In</h2>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
