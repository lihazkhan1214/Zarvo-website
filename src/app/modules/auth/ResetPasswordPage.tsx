import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";
import PasswordField from "./components/PasswordField";
import PasswordStrength from "./components/PasswordStrength";
import { resetSchema } from "./validation";

const ResetPasswordPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthShell title="Reset Password">
      <Formik
        initialValues={{ password: "", confirm: "" }}
        validationSchema={resetSchema}
        onSubmit={() => nav("/auth/login")}
      >
        {({ values, isSubmitting, isValid, dirty }) => (
          <Form className="space-y-4">
            <PasswordField
              name="password"
              label="New Password"
              placeholder="Enter your new password"
            />
            <PasswordStrength value={values.password} />
            <PasswordField
              name="confirm"
              label="Confirm Password"
              placeholder="Confirm your new password"
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
export default ResetPasswordPage;
