import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Offer } from "./components/OfferCard";
import OfferCard from "./components/OfferCard";
import TagPill from "./components/TagPill";
import BackButtonAuto from "../../../components/BackButton";
import Wrapper from "../../../components/Wrapper";

/* ---------- demo data (ids must be unique) ---------- */
const ALL_OFFERS: Offer[] = [
  {
    id: "1",
    title: "Success Pluse",
    subtitle: "Read inspiring the business articles",
    priceZar: 750,
    badge: "Z",
    category: "Popular",
  },
  {
    id: "2",
    title: "eLearning College",
    subtitle: "Access online diploma courses",
    priceZar: 750,
    badge: "E",
    category: "Courses",
  },
  {
    id: "3",
    title: "Success Pluse",
    subtitle: "Read inspiring the business articles",
    priceZar: 750,
    badge: "Z",
    category: "Business",
  },
  {
    id: "4",
    title: "Success Pluse",
    subtitle: "Read inspiring the business articles",
    priceZar: 500,
    badge: "Z",
    category: "Popular",
  },
  {
    id: "5",
    title: "eLearning College",
    subtitle: "Access online diploma courses",
    priceZar: 1200,
    badge: "E",
    category: "Courses",
  },
];

const CATEGORIES = ["Popular", "Business", "Courses"] as const;
type Cat = (typeof CATEGORIES)[number];

/* ---------- modal shells ---------- */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#14161A] ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- details modal ---------- */
function RedeemDetailsModal({
  offer,
  balance,
  tokenSymbol = "ZRV",
  onClose,
  onRedeem,
}: {
  offer: Offer;
  balance: number;
  tokenSymbol?: string;
  onClose: () => void;
  onRedeem: () => void;
}) {
  const cost = offer.priceZar; // treat priceZar as ZRV cost (matches your UI)
  const canRedeem = balance >= cost;

  return (
    <Modal onClose={onClose}>
      <div className="px-6 py-6 text-white">
        <h3 className="text-center text-lg font-semibold">
          Redeem {offer.title}
        </h3>

        <div className="mt-6 grid place-items-center gap-3">
          {/* avatar */}
          <div className="h-16 w-16 rounded-full bg-[#3b82f6] grid place-items-center text-white font-semibold">
            {offer.badge ?? "Z"}
          </div>
          <div className="text-center">
            <div className="text-base font-semibold">{offer.title}</div>
            <div className="text-sm text-white/70">{offer.subtitle}</div>
          </div>
        </div>

        <div className="mt-8 text-sm text-white/80">Redemption Details</div>
        <div className="mt-2 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Redemption Cost</span>
            <span className="font-semibold">
              {cost}
              {tokenSymbol}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Available Balance</span>
            <span className="font-semibold">
              {balance}
              {tokenSymbol}
            </span>
          </div>
        </div>

        {!canRedeem && (
          <div className="mt-4 rounded-lg bg-red-500/10 text-red-300 text-sm px-3 py-2">
            Insufficient balance to redeem this offer.
          </div>
        )}

        <div className="mt-8">
          <button
            disabled={!canRedeem}
            onClick={onRedeem}
            className={`w-full rounded-xl bg-[#FFCF4A] py-3 text-black font-semibold hover:brightness-95 transition
              ${!canRedeem ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            Redeem
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full rounded-xl bg-white/5 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------- success modal ---------- */
function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div className="px-6 pt-10 pb-6 text-white text-center">
        <div className="mx-auto h-28 w-28 rounded-full border-4 border-emerald-500 grid place-items-center">
          {/* check icon */}
          <svg
            viewBox="0 0 24 24"
            className="h-12 w-12 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <div className="mt-6 text-lg font-semibold">Success</div>
        <p className="mt-1 text-sm text-white/80">
          You have successfully redeemed your tokens
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-[#FFCF4A] py-3 text-black font-semibold hover:brightness-95 transition"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}

export default function RedeemZarvoPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("Popular");

  // simulated wallet balance (ZRV)
  const [balance, setBalance] = useState<number>(1200);

  // modals
  const [selected, setSelected] = useState<Offer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return ALL_OFFERS.filter(
      (o) =>
        (cat ? o.category === cat : true) &&
        (ql
          ? o.title.toLowerCase().includes(ql) ||
            o.subtitle.toLowerCase().includes(ql)
          : true)
    );
  }, [q, cat]);

  const handleRedeem = () => {
    if (!selected) return;
    const cost = selected.priceZar;
    if (balance >= cost) {
      setBalance((b) => b - cost); // deduct
      setSelected(null); // close details
      setShowSuccess(true); // open success
    }
  };

  return (
    <Wrapper>
      {/* Header */}
      <header className="mx-auto w-full max-w-7xl px-6  flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BackButtonAuto />
        </div>
        <div className="text-sm text-white/70">
          Balance: <span className="font-mono text-white">{balance} ZRV</span>
        </div>
      </header>

      {/* Content */}

      <div className="  mx-auto w-full max-w-7xl px-6 ">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services or offers"
            className="w-full rounded-xl bg-[#14161A] pl-10 pr-3 py-3 text-sm ring-1 ring-white/10 placeholder-white/30
                         focus:outline-none focus:ring-2 focus:ring-[#FFCF4A]/60"
          />
        </div>

        {/* Category pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <TagPill
              key={c}
              label={c}
              active={c === cat}
              onClick={() => setCat(c)}
            />
          ))}
        </div>

        {/* Offers */}
        <h2 className="mt-6 text-base font-semibold">Offers</h2>
        <div className="mt-3 grid grid-cols-1 gap-4">
          {list.map((o) => (
            <OfferCard key={o.id} offer={o} onClick={() => setSelected(o)} />
          ))}
          {list.length === 0 && (
            <div className="col-span-full rounded-xl bg-white/5 text-white/70 p-6 text-sm">
              No offers found. Try a different search.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selected && (
        <RedeemDetailsModal
          offer={selected}
          balance={balance}
          onClose={() => setSelected(null)}
          onRedeem={handleRedeem}
        />
      )}
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </Wrapper>
  );
}
