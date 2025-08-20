import React from "react";

const Brand: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`mb-8 flex items-center justify-center ${className || ""}`}>
      {/* Replace with your SVG/IMG if you have one */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-yellow-400/95" />
        <div className="text-3xl font-extrabold tracking-wide">ZARVO</div>
      </div>
    </div>
  );
};
export default Brand;
