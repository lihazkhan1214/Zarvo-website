import * as Yup from "yup";

export const emailSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const signupSchema = Yup.object({
  fullName: Yup.string().min(2, "Too short").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRules, "8+ chars with upper, lower, number & symbol")
    .required("Password is required"),
  referral: Yup.string().max(32, "Too long").optional(),
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .matches(passwordRules, "8+ chars with upper, lower, number & symbol")
    .required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Required"),
});
