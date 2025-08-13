import React, { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { Card } from "../../../components/Card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import RateCard from "./components/RateCard";
import StatRow from "./components/StatRow";

/* ---------- Types ---------- */
type RangeKey = "24h" | "1D" | "7D" | "30d";
type Point = { t: string | number; v: number };
type BurnItem = { amount: number; when: string };
type Rates = { code: string; value: string; change: number }[];

/* ---------- Mock API (replace with real endpoints) ---------- */
async function fetchAnalytics(range: RangeKey) {
  // Replace with your API calls:
  // const res = await fetch(`/api/analytics?range=${range}`);
  // return await res.json();

  // Demo data:
  const now = Date.now();
  const step =
    range === "24h"
      ? 60 * 60e3
      : range === "1D"
      ? 2 * 60 * 60e3
      : range === "7D"
      ? 12 * 60 * 60e3
      : 24 * 60 * 60e3;
  const pts: Point[] = Array.from({ length: 16 }).map((_, i) => ({
    t: new Date(now - (15 - i) * step).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    v: 20 + Math.round(10 * Math.sin(i / 2) + (Math.random() * 6 - 3)),
  }));

  return {
    total: 2547.89,
    pctChange: 12.6,
    series: pts,
    supply: { circulating: 12.08, total: 12.08 }, // in Millions
    burns: [
      { amount: 24230, when: "1 day ago" },
      { amount: 24230, when: "3 days ago" },
    ] as BurnItem[],
    rates: [
      { code: "USD", value: "$1.23", change: +5.4 },
      { code: "PKR", value: "Rs345", change: -5.4 },
      { code: "AED", value: "د.إ‎ 4.52", change: +5.4 },
    ] as Rates,
  };
}

/* ---------- Small UI pieces ---------- */
const PillTabs: React.FC<{
  value: RangeKey;
  onChange: (v: RangeKey) => void;
  items?: RangeKey[];
}> = ({ value, onChange, items = ["24h", "1D", "7D", "30d"] }) => (
  <div className="inline-flex gap-2 rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
    {items.map((k) => (
      <button
        key={k}
        onClick={() => onChange(k)}
        className={`px-3 py-1.5 text-xs rounded-lg transition ${
          value === k
            ? "bg-[#F5C242] text-[#101014] font-semibold"
            : "text-white/70 hover:text-white"
        }`}
      >
        {k}
      </button>
    ))}
  </div>
);

/* ---------- Page ---------- */
const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState<RangeKey>("24h");
  const [total, setTotal] = useState(0);
  const [pctChange, setPctChange] = useState(0);
  const [series, setSeries] = useState<Point[]>([]);
  const [supply, setSupply] = useState({ circulating: 0, total: 0 });
  const [burns, setBurns] = useState<BurnItem[]>([]);
  const [rates, setRates] = useState<Rates>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const data = await fetchAnalytics(range);
      if (!mounted) return;
      setTotal(data.total);
      setPctChange(data.pctChange);
      setSeries(data.series);
      setSupply(data.supply);
      setBurns(data.burns);
      setRates(data.rates);
    };
    load();
    const id = setInterval(load, 30_000); // refresh every 30s
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [range]);

  const changeChip = useMemo(
    () =>
      pctChange >= 0 ? (
        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-400 text-xs align-middle">
          +{pctChange.toFixed(1)}%
        </span>
      ) : (
        <span className="rounded-full bg-rose-500/10 px-2 py-1 text-rose-400 text-xs align-middle">
          {pctChange.toFixed(1)}%
        </span>
      ),
    [pctChange]
  );

  return (
    <main className="min-h-screen bg-[#0F0F15] text-[#F5F7FA]">
      {/* Header */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Analytics</div>
        <div className="text-sm">
          <span className="text-white/60 mr-2">ZRV</span>
          {changeChip}
        </div>
      </div>

      {/* Chart card */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <Card className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#12121A] to-[#1A1A25] ring-1 ring-white/10">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-3xl font-bold">{total.toLocaleString()}</div>
              <PillTabs value={range} onChange={setRange} />
            </div>

            <div className="mt-6 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series}>
                    <defs>
                      <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#A78BFA"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor="#A78BFA"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeOpacity={0.08} vertical={false} />
                    <XAxis
                      dataKey="t"
                      tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1A1A25",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        color: "#F5F7FA",
                      }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      formatter={(v: any) => [v, "Value"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      fill="url(#area)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Supply + Burn */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-xl ring-1 ring-white/10 bg-white/5">
                <div className="p-5">
                  <div className="text-sm text-white/60">SUPPLY</div>
                  <div className="mt-4 space-y-2">
                    <StatRow
                      label="Circulating Supply"
                      value={`${supply.circulating.toFixed(2)}M`}
                    />
                    <div className="h-px bg-white/10" />
                    <StatRow
                      label="Total Supply"
                      value={`${supply.total.toFixed(2)}M`}
                    />
                  </div>
                </div>
              </Card>

              <Card className="rounded-xl ring-1 ring-white/10 bg-white/5">
                <div className="p-5">
                  <div className="text-sm text-white/60">BURN HISTORY</div>
                  <div className="mt-4 space-y-4">
                    {burns.map((b, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                            <Flame size={16} className="text-white/70" />
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">
                              {b.amount.toLocaleString()}
                            </span>{" "}
                            <span className="text-white/60">ZARVO</span>
                          </div>
                        </div>
                        <div className="text-xs text-white/50">{b.when}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      {/* Rates */}
      <div className="mx-auto w-full max-w-7xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {rates.map((r) => (
          <RateCard
            key={r.code}
            code={r.code}
            value={r.value}
            change={r.change}
          />
        ))}
      </div>

      <div className="h-16" />
    </main>
  );
};

export default AnalyticsPage;
