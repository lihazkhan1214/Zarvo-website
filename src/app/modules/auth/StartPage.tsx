import React from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";

const StartPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <AuthShell>
      <div className="space-y-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
          <div className="h-10 w-10 rounded-lg bg-yellow-400/95" />
          <div className="text-3xl font-extrabold tracking-wide">ZARVO</div>
        </div>
        <p className="text-white/70">
          The world’s largest Web3 Interactive platform
        </p>
        <Button onClick={() => nav("/auth/signup")}>Signup</Button>
        <Button variant="ghost" onClick={() => nav("/auth/login")}>
          Signin
        </Button>
      </div>
    </AuthShell>
  );
};
export default StartPage;
