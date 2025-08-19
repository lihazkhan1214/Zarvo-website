import { Link } from "react-router-dom";
import clsx from "clsx";

type TileProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  to?: string;
};

export default function Tile({
  icon,
  title,
  subtitle,
  right,
  onClick,
  to,
}: TileProps) {
  const WrapperTag: any = to ? Link : "div";

  return (
    <WrapperTag
      to={to}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-xl bg-[#1A1C20] p-4 transition",
        "hover:bg-[#23252b] cursor-pointer"
      )}
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{title}</div>
        {subtitle && (
          <div className="text-xs text-white/50 truncate">{subtitle}</div>
        )}
      </div>
      {right && <div className="shrink-0 text-white/60">{right}</div>}
    </WrapperTag>
  );
}
