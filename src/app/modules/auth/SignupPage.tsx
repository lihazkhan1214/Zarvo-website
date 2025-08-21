import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";
import PasswordStrength from "./components/PasswordStrength";
import { signupSchema } from "./validation";

const SignupPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthShell title="Create an account">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          referral: "",
          accept: true,
        }}
        validationSchema={signupSchema}
        onSubmit={() => nav("/auth/verify?context=signup")}
      >
        {({ values, isSubmitting, isValid, dirty }) => (
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
            <PasswordStrength value={values.password} />
            <TextField
              name="referral"
              label="Referral Code"
              placeholder="Enter referral code (optional)"
            />
            <label className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <Field
                type="checkbox"
                name="accept"
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              I agree to the&nbsp;
              <a
                href="/legal/terms"
                className="text-yellow-400 hover:underline"
              >
                Terms
              </a>
              &nbsp;and&nbsp;
              <a
                href="/legal/privacy"
                className="text-yellow-400 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </label>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty}
            >
              Next
            </Button>

            <p className="text-center text-sm text-white/60">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-yellow-400 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthShell>
  );
};
export default SignupPage;
