import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  full?: boolean;
};

const Button: React.FC<Props> = ({
  variant = "primary",
  full = true,
  className,
  children,
  ...rest
}) => {
  const base = "rounded-xl py-3 text-sm font-semibold transition";
  const map = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-60",
    ghost: "bg-white/5 text-white hover:bg-white/10",
    outline:
      "border border-white/15 bg-transparent text-white hover:bg-white/5",
  } as const;

  return (
    <button
      {...rest}
      className={clsx(base, map[variant], full && "w-full", className)}
    >
      {children}
    </button>
  );
};

export default Button;
