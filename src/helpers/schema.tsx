import * as yup from "yup";
import { Gender } from "../types/types";

export const loginSschema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    dateOfBirth: yup
      .date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
      .required("Date of Birth is required"),
    gender: yup
      .mixed<Gender>()
      .oneOf(["male", "female"])
      .required("Gender is required"),
    password: yup.string().required("Password is required").min(8),
    confirmPassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();
