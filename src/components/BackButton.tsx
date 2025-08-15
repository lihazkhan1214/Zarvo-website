import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type Props = {
  label?: string;
  className?: string;
  iconSize?: number;
};

export default function BackButtonAuto({
  label = "Back",
  className = "",
  iconSize = 18,
}: Props) {
  const nav = useNavigate();
  return (
    <button
      onClick={() => nav(-1)}
      className={`inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 transition px-3 py-2 ${className}`}
    >
      <ArrowLeft size={iconSize} />
      <span className="text-sm">{label}</span>
    </button>
  );
}
