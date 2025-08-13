import React from "react";
import { ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Card } from "../../../../components/Card";

/** Your original Google Play badge (unchanged colors) */
const PlayBadge: React.FC = () => (
  <svg
    width="156"
    height="46"
    viewBox="0 0 156 46"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <rect width="156" height="46" rx="10" fill="#17171c" stroke="#27272f" />
    <g transform="translate(14,10)">
      <polygon points="0,13 0,3 9,8" fill="#00E676" />
      <polygon points="0,23 0,13 9,18" fill="#00C853" />
      <polygon points="9,18 0,13 9,8 19,13" fill="#40C4FF" />
      <polygon points="19,13 9,18 19,23" fill="#2962FF" />
    </g>
    <text
      x="48"
      y="19"
      fill="#9aa0a6"
      fontSize="10"
      fontFamily="Inter, sans-serif"
    >
      GET IT ON
    </text>
    <text
      x="48"
      y="34"
      fill="#f5f6f7"
      fontSize="16"
      fontWeight={700}
      fontFamily="Inter, sans-serif"
    >
      Google Play
    </text>
  </svg>
);

type Props = {
  playUrl?: string; // e.g. https://play.google.com/store/apps/details?id=...
  logoSrc?: string; // e.g. /assets/zarvo-logo.svg or .png
  qrSrc?: string; // optional QR image
  versionLabel?: string; // e.g. "v1.0.3"
};

export default function DownloadCta({
  playUrl = "#",
  logoSrc = "/assets/zarvo-logo.svg",
  qrSrc,
  versionLabel = "Android Release",
}: Props) {
  return (
    <Card className=" border border-white/5 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        {/* Left: Branding + copy */}
        <div className="w-full max-w-2xl">
          {/* Brand row */}
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Zarvo" className="h-8 w-auto select-none" />
            <span className="inline-block h-2 w-2 rounded-full bg-[#F5C242]" />
            <span className="text-sm tracking-wide text-[#9AA0A6]">
              {versionLabel}
            </span>
          </div>

          {/* Headline & subcopy */}
          <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-[#F5F7FA]">
            Get Zarvo on Android
          </h3>
          <p className="mt-2 text-sm md:text-base text-[#9AA0A6]">
            Download the official Zarvo app from Google Play. Mine, send, and
            redeem — all in one place.
          </p>

          {/* Feature chips (same brand colors) */}
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <li className="flex items-center gap-2 text-sm text-[#9AA0A6]">
              <Sparkles size={16} className="text-[#F5C242]" />
              Smooth UX
            </li>
            <li className="flex items-center gap-2 text-sm text-[#9AA0A6]">
              <ShieldCheck size={16} className="text-[#4CAF50]" />
              Secure Wallet
            </li>
            <li className="flex items-center gap-2 text-sm text-[#9AA0A6]">
              <Timer size={16} className="text-[#7B61FF]" />
              Real‑time Mining
            </li>
          </ul>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={playUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Get it on Google Play"
              className="inline-flex hover:opacity-90 transition"
            >
              <PlayBadge />
            </a>

            <a
              href={playUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-4 py-3 text-sm font-semibold bg-[#F5C242] text-[#101014] border border-white/10 hover:opacity-90 transition"
            >
              Download
            </a>

            <span className="text-xs text-[#9AA0A6]">
              or scan QR from your phone
            </span>
          </div>

          {/* Legal */}
          <p className="mt-3 text-xs text-[#70757a]">
            By installing, you agree to Zarvo’s Terms. Available on Android
            8.0+.
          </p>
        </div>

        {/* Right: QR card */}
        <div className="w-full sm:w-auto">
          <div className="rounded-2xl border border-white/5 bg-[#101115] p-4 flex flex-col items-center">
            {qrSrc ? (
              <img
                src={qrSrc}
                alt="Scan to install Zarvo"
                className="h-32 w-32 rounded-lg border border-white/10"
              />
            ) : (
              <div className="h-32 w-32 rounded-lg grid place-items-center text-xs bg-[repeating-linear-gradient(45deg,#222,#222_10px,#1B1C26_10px,#1B1C26_20px)] text-[#9AA0A6] border border-white/10">
                QR
              </div>
            )}
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-[#F5F7FA]">
                Scan to install
              </p>
              <p className="text-xs text-[#9AA0A6]">
                Open camera and point to code
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
