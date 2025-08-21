import React from "react";

export function passwordScore(v: string) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[a-z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return Math.min(4, Math.max(0, s - 1)); // 0..4
}

const PasswordStrength: React.FC<{ value: string }> = ({ value }) => {
  const score = passwordScore(value);
  const color =
    score >= 3
      ? "bg-green-400/90"
      : score >= 2
      ? "bg-yellow-400/90"
      : "bg-red-400/90";
  const label = ["Weak", "Weak", "Okay", "Good", "Strong"][score];

  return (
    <div className="mt-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          style={{ width: `${(score + 1) * 20}%` }}
          className={`h-full ${color}`}
        />
      </div>
      <div className="mt-1 text-xs text-white/60">Strength: {label}</div>
    </div>
  );
};

export default PasswordStrength;
