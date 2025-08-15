import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  to: string; // path to navigate back to
  label?: string; // optional text, defaults to "Back"
  className?: string; // for extra styling overrides
  iconSize?: number; // optional icon size (default 18)
};

export default function BackButton({
  to,
  label = "Back",
  className = "",
  iconSize = 18,
}: BackButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 transition px-3 py-2 ${className}`}
    >
      <ArrowLeft size={iconSize} />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
