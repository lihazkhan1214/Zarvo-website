import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <div className=" bg-[#0E0F13] mx-auto max-w-7xl text-white">
      <main className="w-full px-4 py-8 space-y-6">{children}</main>
    </div>
  );
}

export default Wrapper;
