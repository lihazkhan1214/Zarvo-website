import { useMemo, useState, useRef } from "react";
import {
  Share2,
  Copy,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import clsx from "clsx";
import BackButtonAuto from "../../../components/BackButton";
import Wrapper from "../../../components/Wrapper";
import { copyText, type CopyMethod } from "../../utils/copy";

// Pagination Component
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

type Leader = { id: string; name: string; referrals: number; rank: number };

const DEMO_LEADERS: Leader[] = [
  { id: "1", name: "AliKhan", referrals: 12, rank: 1 },
  { id: "2", name: "Fatima", referrals: 10, rank: 2 },
  { id: "3", name: "Usman", referrals: 9, rank: 3 },
  { id: "4", name: "Ayesha", referrals: 8, rank: 4 },
  { id: "5", name: "Bilal", referrals: 7, rank: 5 },
  { id: "6", name: "Zohaib", referrals: 6, rank: 6 },
  { id: "7", name: "Sara", referrals: 5, rank: 7 },
  { id: "8", name: "Hassan", referrals: 4, rank: 8 },
];

export default function ReferralPage() {
  const [code] = useState("ZVR02024");
  const [friendsInvited] = useState(12);
  const [earnedZrv] = useState(1200);
  const [leaders] = useState(DEMO_LEADERS);

  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(leaders.length / pageSize));

  const pageItems = useMemo(() => {
    const startIndex = page * pageSize;
    return leaders.slice(startIndex, startIndex + pageSize);
  }, [leaders, page]);

  // Copy & Share
  const [copied, setCopied] = useState<CopyMethod | null>(null);
  const [showManual, setShowManual] = useState(false);
  const manualRef = useRef<HTMLInputElement>(null);

  async function onCopy() {
    const method = await copyText(code);
    setCopied(method);
    if (method === "manual") {
      setShowManual(true);
      setTimeout(() => manualRef.current?.select(), 0);
    } else {
      setTimeout(() => setCopied(null), 1200);
    }
  }

  async function onShare() {
    const shareData: ShareData = {
      title: "Zarvo referral code",
      text: `Use my Zarvo referral code: ${code} — earn 5 ZRV on successful referral.`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {}
    }
    await onCopy();
  }

  return (
    <div className="min-h-screen bg-[#0E0F13] text-white">
      <Wrapper>
        {/* Header */}
        <BackButtonAuto />

        <div className="space-y-6">
          {/* Rewards */}
          <section className="rounded-2xl bg-[#14161A] ring-1 ring-white/10 p-5">
            <h2 className="text-center text-base font-semibold">
              Referral & Rewards
            </h2>
            <p className="mt-2 text-center text-sm text-white/70">
              Earn <span className="font-semibold text-white">5 ZRV</span> for
              each successful referral
            </p>

            <div className="mt-5 flex items-stretch gap-2">
              <div className="flex-1 rounded-xl bg-[#1A1C23] ring-1 ring-white/10 px-4 py-3 font-mono text-sm">
                {code}
              </div>
              <button
                onClick={onCopy}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm hover:bg-white/10 ring-1 ring-white/10"
              >
                <Copy className="h-4 w-4" />
                {copied ? (copied === "manual" ? "Copy…" : "Copied!") : "Copy"}
              </button>
            </div>

            <button
              onClick={onShare}
              className="mt-4 w-full rounded-xl bg-[#FFCF4A] py-3 text-black font-semibold hover:brightness-95 inline-flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Code
            </button>
          </section>

          {/* Status */}
          <section className="rounded-2xl bg-[#14161A] ring-1 ring-white/10 p-5">
            <h3 className="text-base font-semibold">Referral Status</h3>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-2xl font-bold">{friendsInvited}</div>
                <div className="text-xs text-white/60 mt-1">
                  Friends Invited
                </div>
              </div>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="text-2xl font-bold text-[#FFCF4A]">
                  {earnedZrv}
                </div>
                <div className="text-xs text-white/60 mt-1">ZRV Earned</div>
              </div>
            </div>
          </section>

          {/* Leaderboard */}
          <section className="rounded-2xl bg-[#14161A] ring-1 ring-white/10 divide-y divide-white/10">
            {pageItems.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/5 grid place-items-center text-sm font-semibold">
                    {u.rank}
                  </div>
                  <span>{u.name}</span>
                </div>
                <span className="text-sm text-white/80">
                  {u.referrals} referrals
                </span>
              </div>
            ))}
          </section>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </Wrapper>
    </div>
  );
}
