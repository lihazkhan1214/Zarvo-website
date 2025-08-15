import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import BackButtonAuto from "../../../components/BackButton";
import Wrapper from "../../../components/Wrapper";

/* ---------------- Types ---------------- */
type TxKind = "send" | "receive" | "redeem";

type Tx = {
  id: string;
  kind: TxKind;
  to: string; // address/recipient
  amount: number; // positive value
  symbol: string; // "ZRV"
  time: string; // e.g., "4:00"
};

/* ---------------- Demo Data (extend as needed) ---------------- */
const DEMO: Tx[] = [
  {
    id: "t1",
    kind: "send",
    to: "EQ....1KJL",
    amount: 2,
    symbol: "ZRV",
    time: "4:00",
  },
  {
    id: "t2",
    kind: "receive",
    to: "EQ....1KJL",
    amount: 2,
    symbol: "ZRV",
    time: "4:00",
  },
  {
    id: "t3",
    kind: "redeem",
    to: "EQ....1KJL",
    amount: 22,
    symbol: "ZRV",
    time: "4:00",
  },
  {
    id: "t4",
    kind: "send",
    to: "EQ....1KJL",
    amount: 0.7,
    symbol: "ZRV",
    time: "3:21",
  },
  {
    id: "t5",
    kind: "receive",
    to: "EQ....ZZ12",
    amount: 1.3,
    symbol: "ZRV",
    time: "2:10",
  },
  {
    id: "t6",
    kind: "redeem",
    to: "EQ....9ABX",
    amount: 50,
    symbol: "ZRV",
    time: "1:45",
  },
  // add more to see pagination shine
  {
    id: "t7",
    kind: "send",
    to: "EQ....AAAA",
    amount: 5,
    symbol: "ZRV",
    time: "1:10",
  },
  {
    id: "t8",
    kind: "receive",
    to: "EQ....BBBB",
    amount: 3.2,
    symbol: "ZRV",
    time: "0:55",
  },
  {
    id: "t9",
    kind: "send",
    to: "EQ....CCCC",
    amount: 1.1,
    symbol: "ZRV",
    time: "0:30",
  },
  {
    id: "t10",
    kind: "redeem",
    to: "EQ....DDDD",
    amount: 8,
    symbol: "ZRV",
    time: "0:05",
  },
];

/* ---------------- Small UI bits ---------------- */
function Pill({
  active,
  children,
  onClick,
  className = "",
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition",
        active
          ? "bg-white/15 text-white"
          : "bg-white/5 text-white/80 hover:bg-white/10",
        className
      )}
    >
      {children}
    </button>
  );
}

function TxIcon({ kind }: { kind: TxKind }) {
  const base = "h-5 w-5";
  if (kind === "send") return <ArrowUpRight className={base} />;
  if (kind === "receive") return <ArrowDownLeft className={base} />;
  return <Gift className={base} />;
}

function TxTitle({ kind }: { kind: TxKind }) {
  if (kind === "send") return <>Sent</>;
  if (kind === "receive") return <>Received</>;
  return <>Redeemed</>;
}

function Amount({
  kind,
  value,
  symbol,
}: {
  kind: TxKind;
  value: number;
  symbol: string;
}) {
  const sign = kind === "receive" ? "+" : "-";
  const color =
    kind === "receive"
      ? "text-emerald-400"
      : kind === "redeem"
      ? "text-emerald-400"
      : "text-white/80";
  return (
    <span className={clsx("font-semibold", color)}>
      {sign}
      {value}
      {symbol}
    </span>
  );
}

/* row */
function TxRow({ tx }: { tx: Tx }) {
  return (
    <div className="rounded-xl bg-[#14161A] ring-1 ring-white/10 p-4 hover:ring-white/20 transition">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
          <TxIcon kind={tx.kind} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">
            <TxTitle kind={tx.kind} />
          </div>
          <div className="text-xs text-white/60 truncate">to:{tx.to}</div>
        </div>
        <div className="text-right">
          <Amount kind={tx.kind} value={tx.amount} symbol={tx.symbol} />
          <div className="text-xs text-white/50">{tx.time}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Pagination component ---------------- */
function Pagination({
  page,
  totalPages,
  onChange,
  className = "",
}: {
  page: number; // 0-index
  totalPages: number; // >= 1
  onChange: (next: number) => void;
  className?: string;
}) {
  // build compact page numbers around current: e.g., [1,2,3] or [2,3,4]
  const windowSize = 5;
  const start = Math.max(
    0,
    Math.min(page - Math.floor(windowSize / 2), totalPages - windowSize)
  );
  const end = Math.min(totalPages, start + windowSize);
  const pages = Array.from({ length: end - start }, (_, i) => start + i);

  const go = (n: number) => onChange(Math.max(0, Math.min(totalPages - 1, n)));

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-between gap-3 text-sm",
        className
      )}
    >
      {/* left: summary */}
      <div className="text-white/60">
        Page <span className="text-white">{page + 1}</span> of {totalPages}
      </div>

      {/* right: controls */}
      <div className="flex items-center gap-1">
        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(0)}
          disabled={page === 0}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(page - 1)}
          disabled={page === 0}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={clsx(
              "rounded-lg px-3 py-2",
              p === page
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/80 hover:bg-white/10"
            )}
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p + 1}
          </button>
        ))}

        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(page + 1)}
          disabled={page >= totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(totalPages - 1)}
          disabled={page >= totalPages - 1}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function TransactionHistoryPage() {
  const [filter, setFilter] = useState<TxKind | "all">("all");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === "all" ? DEMO : DEMO.filter((t) => t.kind === filter)),
    [filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // ensure page stays within range when pageSize/filter changes
  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [page, totalPages]);

  const startIndex = page * pageSize;
  const endIndex = Math.min(filtered.length, startIndex + pageSize);
  const pageItems = filtered.slice(startIndex, endIndex);

  const onPageChange = (n: number) => {
    setPage(n);
    // smooth scroll back to the top list anchor for better UX
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const count = (k: TxKind) => DEMO.filter((t) => t.kind === k).length;

  return (
    <Wrapper>
      <BackButtonAuto />
      <div className="flex flex-wrap items-center gap-2 pb-4">
        {/* mx-auto bhi hata diya */}
        <Pill active={filter === "send"} onClick={() => setFilter("send")}>
          Send <span className="text-white/40">({count("send")})</span>
        </Pill>
        <Pill
          active={filter === "receive"}
          onClick={() => setFilter("receive")}
        >
          Receive <span className="text-white/40">({count("receive")})</span>
        </Pill>
        <Pill active={filter === "redeem"} onClick={() => setFilter("redeem")}>
          Redeem <span className="text-white/40">({count("redeem")})</span>
        </Pill>
        <Pill
          active={filter === "all"}
          onClick={() => setFilter("all")}
          className="ml-1"
        >
          All <span className="text-white/40">({DEMO.length})</span>
        </Pill>
      </div>

      {/* max-w-3xl mx-auto hata diya */}
      <h2 className="mt-2 mb-3 text-base font-semibold">Transaction History</h2>
      <div className="space-y-3">
        {pageItems.map((t) => (
          <TxRow key={t.id} tx={t} />
        ))}
        {pageItems.length === 0 && (
          <div className="rounded-xl bg-white/5 p-6 text-sm text-white/70">
            No transactions for this filter.
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/60">
          Showing{" "}
          <span className="text-white">
            {filtered.length ? startIndex + 1 : 0}
          </span>
          –<span className="text-white">{endIndex}</span> of{" "}
          <span className="text-white">{filtered.length}</span> results
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={onPageChange}
        />
      </div>
    </Wrapper>
  );
}
