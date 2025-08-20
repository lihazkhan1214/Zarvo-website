import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import AuthLayout from "./components/AuthLayout";
import Brand from "./components/Brand";
import OtpInput from "./components/OtpInput";
import Button from "./components/Button";
const VerifyOtpPage: React.FC = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const context = params.get("context") || "signup"; // "signup" | "forgot"

  const [seconds, setSeconds] = React.useState(60);
  React.useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  return (
    <AuthLayout
      title="Enter Verification Code"
      subtitle="Please enter the 6 digit code sent to your email"
    >
      <Brand />

      <Formik
        initialValues={{ otp: "" }}
        onSubmit={() =>
          context === "forgot" ? nav("/auth/reset") : nav("/home")
        }
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <OtpInput
              value={values.otp}
              onChange={(v) => setFieldValue("otp", v)}
              length={6}
            />

            <div className="text-sm text-white/60">
              Resend OTP in {seconds}s{" "}
              {seconds === 0 && (
                <button
                  type="button"
                  onClick={() => setSeconds(60)}
                  className="text-yellow-400 hover:underline"
                >
                  Resend
                </button>
              )}
            </div>

            <Button type="submit" disabled={values.otp.length !== 6}>
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
export default VerifyOtpPage;
