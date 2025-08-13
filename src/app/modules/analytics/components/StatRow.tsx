import type React from "react";

const StatRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-white/70">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default StatRow;
