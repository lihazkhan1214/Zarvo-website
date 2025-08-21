import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";
import OtpInput from "./components/OtpInput";

const VerifyOtpPage: React.FC = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const context = params.get("context") || "signup";

  const [sec, setSec] = React.useState(60);
  React.useEffect(() => {
    if (sec <= 0) return;
    const id = setTimeout(() => setSec((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [sec]);

  return (
    <AuthShell
      title="Enter Verification Code"
      subtitle="Please enter the 6 digit code sent to your email"
    >
      <Formik
        initialValues={{ otp: "" }}
        onSubmit={() =>
          context === "forgot" ? nav("/auth/reset") : nav("/home")
        }
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <OtpInput
              value={values.otp}
              onChange={(v) => setFieldValue("otp", v)}
              length={6}
            />
            <div className="text-sm text-white/60">
              Resend OTP in {sec}s{" "}
              {sec === 0 && (
                <button
                  type="button"
                  onClick={() => setSec(60)}
                  className="text-yellow-400 hover:underline"
                >
                  Resend
                </button>
              )}
            </div>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={values.otp.length !== 6}
            >
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </AuthShell>
  );
};
export default VerifyOtpPage;
