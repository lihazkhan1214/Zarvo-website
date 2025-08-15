import { useRef, useState, useMemo } from "react";
import { QrCode, Share2, Copy } from "lucide-react";
import { copyText, type CopyMethod } from "../../../utils/copy";
import QRCodeBox from "../../../../components/QRCodeBox";

type Props = {
  address: string;
  tokenSymbol?: string;
  tokenName?: string;
  network?: string; // e.g., "Solana", "Ethereum" (optional pill)
  qrSize?: number; // override QR size (px)
  className?: string; // extra wrapper styles
  onCopied?: (method: CopyMethod) => void;
  onShared?: () => void;
};

export default function ReceiveCard({
  address,
  tokenSymbol = "ZRV",
  tokenName = "Zarvo",
  network,
  qrSize = 200,
  className = "",
  onCopied,
  onShared,
}: Props) {
  const [copied, setCopied] = useState<CopyMethod | null>(null);
  const [showManual, setShowManual] = useState(false);
  const manualRef = useRef<HTMLInputElement>(null);

  const shortAddr = useMemo(() => truncateAddress(address), [address]);

  async function onCopy() {
    const method = await copyText(address);
    setCopied(method);
    onCopied?.(method);

    if (method === "manual") {
      setShowManual(true);
      // select text after modal paints
      setTimeout(() => manualRef.current?.select(), 0);
    } else {
      // show "Copied!" briefly
      setTimeout(() => setCopied(null), 1200);
    }
  }

  async function onShare() {
    const shareData: ShareData = {
      title: `${tokenSymbol} Receive Address`,
      text: `${tokenSymbol} (${tokenName})\n${address}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onShared?.();
        return;
      } catch {
        /* user cancelled or not supported → fall back */
      }
    }
    await onCopy(); // fallback to copy/manual
  }

  return (
    <section
      className={`mx-auto w-full max-w-4xl text-[#F5F7FA] ${className}`}
      aria-labelledby="receive-heading"
    >
      <div className="rounded-2xl bg-[#14161A] ring-1 ring-[#1f232b] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-[#FFCF4A] grid place-items-center">
              <QrCode className="h-6 w-6 text-black" />
            </div>
            <div>
              <h2 id="receive-heading" className="text-base font-semibold">
                Receive {tokenSymbol}
              </h2>
              <p className="text-xs text-[#98A2B3]">{tokenName}</p>
            </div>
          </div>

          {network && (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90">
              Network: {network}
            </span>
          )}
        </div>

        {/* Caution */}
        <div className="mx-6 mt-6 rounded-lg bg-[#1E2026] p-3 text-sm text-[#FFCF4A]">
          ⚠️ Only send digital assets that match this deposit address’s
          blockchain.
        </div>

        {/* Body: two-column on desktop */}
        <div className="grid grid-cols-1 gap-8 px-6 py-6 md:grid-cols-2">
          {/* Left: Address + Actions */}
          <div>
            <label className="text-sm text-[#98A2B3]" htmlFor="receive-address">
              Address
            </label>

            {/* Address field with copy button */}
            <div className="mt-2 flex items-stretch gap-2">
              <input
                id="receive-address"
                readOnly
                value={address}
                className="w-full rounded-lg bg-[#0f1115] px-3 py-3 font-mono text-sm text-white/90 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCF4A]/60"
                onFocus={(e) => e.currentTarget.select()}
                aria-label={`${tokenSymbol} address full`}
              />
              <button
                onClick={onCopy}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFCF4A] px-3 py-3 text-sm font-semibold text-black hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFCF4A] focus:ring-offset-[#14161A]"
                aria-label="Copy address"
              >
                <Copy className="h-4 w-4" />
                {copied ? (copied === "manual" ? "Copy…" : "Copied!") : "Copy"}
              </button>
            </div>

            {/* Short address helper line */}
            <div className="mt-2 text-xs text-white/60">
              Short: <span className="font-mono">{shortAddr}</span>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onShare}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/5 px-4 py-3 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label="Share address"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>

              {/* you can add more actions here (e.g., WalletConnect) */}
            </div>
          </div>

          {/* Right: QR */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="w-full max-w-xs">
              <QRCodeBox value={address} label="Scan to receive" />
              {/* If you want exact sizing, pass size={qrSize} to your QRCodeBox implementation */}
              {/* <QRCodeBox value={address} label="Scan to receive" size={qrSize} /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Manual fallback modal for blocked clipboards */}
      {showManual && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setShowManual(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-[#14161A] p-5 ring-1 ring-[#1f232b]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-semibold">Copy address</div>
            <p className="mt-2 text-sm text-[#98A2B3]">
              Clipboard is blocked by the browser. Select the text and press{" "}
              <kbd className="mx-1 rounded bg-black/30 px-1">Ctrl</kbd>+
              <kbd className="rounded bg-black/30 px-1">C</kbd> (or long‑press
              on mobile).
            </p>
            <input
              ref={manualRef}
              readOnly
              value={address}
              className="mt-3 w-full rounded-md bg-[#1E2026] p-3 font-mono text-sm"
              onFocus={(e) => e.currentTarget.select()}
              aria-label="Manual copy address"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowManual(false)}
                className="rounded-md bg-[#FFCF4A] px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* helpers */
function truncateAddress(addr: string, left = 8, right = 6) {
  if (!addr) return "";
  if (addr.length <= left + right + 3) return addr;
  return `${addr.slice(0, left)}…${addr.slice(-right)}`;
}
