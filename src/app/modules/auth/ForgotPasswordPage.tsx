import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";
import TextField from "./components/TextField";
import { emailSchema } from "./validation";

const ForgotPasswordPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthShell
      title="Login"
      subtitle="Enter your email and we’ll send a 6-digit code to reset your password."
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={() => nav("/auth/verify?context=forgot")}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-4">
            <TextField
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty}
            >
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </AuthShell>
  );
};
export default ForgotPasswordPage;
