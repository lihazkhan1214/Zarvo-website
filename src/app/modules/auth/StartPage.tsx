import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Brand from "./components/Brand";
import Button from "./components/Button";

const StartPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <AuthLayout>
      <Brand />
      <div className="mx-auto max-w-sm text-center">
        <p className="mb-8 text-white/70">
          The world’s largest Web3 interactive platform
        </p>
        <div className="space-y-3">
          <Button onClick={() => nav("/auth/signup")}>Signup</Button>
          <Button variant="ghost" onClick={() => nav("/auth/login")}>
            Signin
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
export default StartPage;
