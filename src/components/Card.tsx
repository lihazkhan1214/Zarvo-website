import type React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
}) => (
  <div
    className={`rounded-2xl shadow-lg bg-gradient-to-b from-card to-card2 border border-white/5 ${className}`}
  >
    {children}
  </div>
);
