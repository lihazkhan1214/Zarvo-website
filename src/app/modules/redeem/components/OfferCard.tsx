import { memo } from "react";
import clsx from "clsx";

export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  priceZar: number;
  logo?: string; // url or data-uri (optional)
  badge?: "Z" | "E"; // small fallback avatar if no logo (Z = Zarvo hex, E = generic)
  category: "Popular" | "Business" | "Courses";
};

export default memo(function OfferCard({
  offer,
  onClick,
  className,
}: {
  offer: Offer;
  onClick?: (o: Offer) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onClick?.(offer)}
      className={clsx(
        "w-full rounded-xl bg-[#14161A] ring-1 ring-white/10 px-4 py-4 text-left",
        "hover:ring-white/20 hover:bg-white/[0.06] transition cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Logo / Fallback */}
        {offer.logo ? (
          <img
            src={offer.logo}
            alt=""
            className="h-10 w-10 rounded-md object-cover bg-black/40"
          />
        ) : (
          <div className="h-10 w-10 rounded-md grid place-items-center bg-[#FFCF4A] text-black font-extrabold">
            {offer.badge ?? "Z"}
          </div>
        )}

        <div className="flex-1">
          <div className="text-sm font-semibold text-white/95">
            {offer.title}
          </div>
          <div className="text-xs text-white/60 leading-snug">
            {offer.subtitle}
          </div>
        </div>

        <div>
          <span className="inline-flex items-center rounded-lg bg-[#FFCF4A] px-3 py-2 text-[13px] font-semibold text-black">
            {offer.priceZar}ZAR
          </span>
        </div>
      </div>
    </button>
  );
});
