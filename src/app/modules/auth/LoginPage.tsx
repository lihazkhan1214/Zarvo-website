import React from "react";
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Brand from "./components/Brand";
import { loginSchema } from "./validation";
import Button from "./components/Button";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";

const LoginPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <AuthLayout title="Login">
      <Brand />

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async () => {
          // call your API -> on success navigate
          nav("/home");
        }}
      >
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

          <div className="text-right">
            <Link
              to="/auth/forgot"
              className="text-sm text-yellow-400 hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          <Button type="submit">Next</Button>
        </Form>
      </Formik>
    </AuthLayout>
  );
};
export default LoginPage;
