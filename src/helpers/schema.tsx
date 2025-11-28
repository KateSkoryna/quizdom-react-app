import * as yup from "yup";

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
