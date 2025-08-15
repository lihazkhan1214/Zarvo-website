import clsx from "clsx";

export default function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-full px-4 py-2 text-sm",
        active
          ? "bg-white/20 text-white"
          : "bg-white/5 text-white/80 hover:bg-white/10"
      )}
    >
      {label}
    </button>
  );
}
