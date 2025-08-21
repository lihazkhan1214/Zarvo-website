import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  loading?: boolean;
  full?: boolean;
};
const Button: React.FC<Props> = ({
  variant = "primary",
  loading,
  full = true,
  className = "",
  children,
  ...rest
}) => {
  const styles =
    variant === "primary"
      ? "bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-60"
      : variant === "outline"
      ? "border border-white/15 bg-transparent text-white hover:bg-white/5"
      : "bg-white/5 text-white hover:bg-white/10";
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`rounded-xl py-3 text-sm font-semibold transition ${styles} ${
        full ? "w-full" : ""
      } ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};
export default Button;
