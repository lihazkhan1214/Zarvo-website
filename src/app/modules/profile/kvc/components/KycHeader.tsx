import { ChevronLeft } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  step?: number;
  total?: number;
};

export const KycHeader: React.FC<Props> = ({
  title,
  subtitle,
  onBack,
  step,
  total,
}) => (
  <header className="mb-6">
    <div className="flex items-center gap-3 mb-3">
      {onBack && (
        <button
          onClick={onBack}
          className="rounded-xl bg-white/10 p-2 hover:bg-white/15"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
    {subtitle && <p className="px-1 text-sm text-white/60">{subtitle}</p>}
    {step && total ? (
      <div className="mt-2 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < step ? "bg-yellow-400" : "bg-white/15"
            }`}
          />
        ))}
      </div>
    ) : null}
  </header>
);
