import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Brand from "./components/Brand";
import { signupSchema } from "./validation";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";
import Button from "./components/Button";

const SignupPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthLayout title="Create an account">
      <Brand />

      <Formik
        initialValues={{ fullName: "", email: "", password: "", referral: "" }}
        validationSchema={signupSchema}
        onSubmit={() => nav("/auth/verify?context=signup")}
      >
        <Form className="space-y-4">
          <TextField
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
          />
          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <TextField
            name="referral"
            label="Referral Code"
            placeholder="Enter your referral code (optional)"
          />
          <Button type="submit">Next</Button>
        </Form>
      </Formik>
    </AuthLayout>
  );
};
export default SignupPage;
