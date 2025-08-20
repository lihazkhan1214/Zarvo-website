import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Brand from "./components/Brand";
import { emailSchema } from "./validation";
import TextField from "./components/TextField";
import Button from "./components/Button";

const ForgotPasswordPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthLayout title="Login">
      <Brand />
      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={() => nav("/auth/verify?context=forgot")}
      >
        <Form className="space-y-4">
          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Button type="submit">Next</Button>
        </Form>
      </Formik>
    </AuthLayout>
  );
};
export default ForgotPasswordPage;
