import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";
import { loginSchema } from "./validation";

const LoginPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthShell title="Login">
      <Formik
        initialValues={{ email: "", password: "", remember: true }}
        validationSchema={loginSchema}
        onSubmit={async () => {
          // TODO: call API
          nav("/home");
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => alert("Google OAuth")}
            >
              <span className="mr-2">🟢</span> Continue with Google
            </Button>

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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/80">
                <Field
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-white/20 bg-transparent"
                />
                Remember me
              </label>
              <Link
                to="/auth/forgot"
                className="text-sm text-yellow-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty}
            >
              Next
            </Button>

            <p className="text-center text-sm text-white/60">
              New to Zarvo?{" "}
              <Link
                to="/auth/signup"
                className="text-yellow-400 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthShell>
  );
};
export default LoginPage;
