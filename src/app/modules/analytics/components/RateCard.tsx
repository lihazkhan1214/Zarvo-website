import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../../../../components/Card";

const RateCard: React.FC<{ code: string; value: string; change: number }> = ({
  code,
  value,
  change,
}) => {
  const up = change >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <Card className="rounded-2xl ring-1 ring-white/10 bg-white/5">
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60">{code}</div>
          <div className="mt-1 text-xl font-semibold">{value}</div>
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
            up
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-rose-500/10 text-rose-400"
          }`}
        >
          <Icon size={14} />
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>
    </Card>
  );
};

export default RateCard;
