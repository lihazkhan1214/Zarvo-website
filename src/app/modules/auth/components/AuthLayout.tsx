import React from "react";

type Props = React.PropsWithChildren<{
  title?: string;
  subtitle?: string | React.ReactNode;
}>;

const AuthLayout: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-[100dvh] bg-[#0E1114] text-white ">
      <div className="mx-auto w-full max-w-md px-4 py-8">
        {title && (
          <h1 className="mb-1 text-xl font-semibold tracking-tight">{title}</h1>
        )}
        {subtitle && (
          <p className="mb-6 text-sm text-white/60 leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
