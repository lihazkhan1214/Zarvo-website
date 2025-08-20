import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Brand from "./components/Brand";
import { resetSchema } from "./validation";
import PasswordField from "./components/PasswordField";
import Button from "./components/Button";

const ResetPasswordPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthLayout title="Reset Password">
      <Brand />

      <Formik
        initialValues={{ password: "", confirm: "" }}
        validationSchema={resetSchema}
        onSubmit={() => nav("/auth/login")}
      >
        <Form className="space-y-4">
          <PasswordField
            name="password"
            label="New Password"
            placeholder="Enter your new password"
          />
          <PasswordField
            name="confirm"
            label="Confirm Password"
            placeholder="Confirm your new password"
          />
          <Button type="submit">Next</Button>
        </Form>
      </Formik>
    </AuthLayout>
  );
};
export default ResetPasswordPage;
