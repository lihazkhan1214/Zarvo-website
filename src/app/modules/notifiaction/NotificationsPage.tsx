import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  Bell,
  Info,
  Gift,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import BackButtonAuto from "../../../components/BackButton";
import Wrapper from "../../../components/Wrapper";

/* ---------------- Types ---------------- */
type NotificationType = "system" | "promo" | "alert";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
};

/* ---------------- Demo Data ---------------- */
const DEMO: Notification[] = [
  {
    id: "n1",
    type: "system",
    title: "System Update",
    message: "We will have maintenance at 2 AM UTC.",
    time: "4:00 PM",
  },
  {
    id: "n2",
    type: "promo",
    title: "Welcome Bonus",
    message: "You’ve received 5 ZRV for joining!",
    time: "3:45 PM",
  },
  {
    id: "n3",
    type: "alert",
    title: "Security Alert",
    message: "New login detected from Chrome browser.",
    time: "2:15 PM",
  },
  {
    id: "n4",
    type: "promo",
    title: "Referral Reward",
    message: "You earned 10 ZRV from referring a friend.",
    time: "1:00 PM",
  },
  {
    id: "n5",
    type: "system",
    title: "Feature Release",
    message: "New staking feature is now live!",
    time: "12:30 PM",
  },
  {
    id: "n6",
    type: "alert",
    title: "Password Changed",
    message: "Your account password was updated.",
    time: "11:50 AM",
  },
  {
    id: "n7",
    type: "promo",
    title: "Daily Check-in",
    message: "You received 1 ZRV for daily login.",
    time: "10:00 AM",
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

function NotificationIcon({ type }: { type: NotificationType }) {
  const base = "h-5 w-5";
  if (type === "system") return <Info className={base} />;
  if (type === "promo") return <Gift className={base} />;
  return <Bell className={base} />;
}

function NotificationRow({ item }: { item: Notification }) {
  return (
    <div className="rounded-xl bg-[#14161A] ring-1 ring-white/10 p-4 hover:ring-white/20 transition">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center">
          <NotificationIcon type={item.type} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{item.title}</div>
          <div className="text-xs text-white/60 truncate">{item.message}</div>
        </div>
        <div className="text-xs text-white/50 whitespace-nowrap">
          {item.time}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Pagination ---------------- */
function Pagination({
  page,
  totalPages,
  onChange,
  className = "",
}: {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
  className?: string;
}) {
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
      <div className="text-white/60">
        Page <span className="text-white">{page + 1}</span> of {totalPages}
      </div>

      <div className="flex items-center gap-1">
        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(0)}
          disabled={page === 0}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(page - 1)}
          disabled={page === 0}
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
          >
            {p + 1}
          </button>
        ))}

        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(page + 1)}
          disabled={page >= totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className="rounded-lg px-2 py-2 bg-white/5 text-white/80 hover:bg-white/10 disabled:opacity-40"
          onClick={() => go(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationType | "all">("all");
  const [page, setPage] = useState(0);
  const [pageSize] = useState(5);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === "all" ? DEMO : DEMO.filter((n) => n.type === filter)),
    [filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [page, totalPages]);

  const startIndex = page * pageSize;
  const endIndex = Math.min(filtered.length, startIndex + pageSize);
  const pageItems = filtered.slice(startIndex, endIndex);

  const onPageChange = (n: number) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const count = (t: NotificationType) =>
    DEMO.filter((n) => n.type === t).length;

  return (
    <Wrapper>
      <BackButtonAuto />
      <div className="flex flex-wrap items-center gap-2 pb-4">
        <Pill active={filter === "system"} onClick={() => setFilter("system")}>
          System <span className="text-white/40">({count("system")})</span>
        </Pill>
        <Pill active={filter === "promo"} onClick={() => setFilter("promo")}>
          Promo <span className="text-white/40">({count("promo")})</span>
        </Pill>
        <Pill active={filter === "alert"} onClick={() => setFilter("alert")}>
          Alert <span className="text-white/40">({count("alert")})</span>
        </Pill>
        <Pill active={filter === "all"} onClick={() => setFilter("all")}>
          All <span className="text-white/40">({DEMO.length})</span>
        </Pill>
      </div>

      <h2 className="mt-2 mb-3 text-base font-semibold">Notifications</h2>
      <div className="space-y-3" ref={topRef}>
        {pageItems.map((n) => (
          <NotificationRow key={n.id} item={n} />
        ))}
        {pageItems.length === 0 && (
          <div className="rounded-xl bg-white/5 p-6 text-sm text-white/70">
            No notifications for this filter.
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
