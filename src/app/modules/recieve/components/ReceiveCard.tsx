import { useRef, useState } from "react";
import { QrCode, Share2, Copy } from "lucide-react";
import { copyText, type CopyMethod } from "../../../utils/copy";
import QRCodeBox from "../../../../components/QRCodeBox";

type Props = {
  address: string;
  tokenSymbol?: string;
  tokenName?: string;
};

export default function ReceiveCard({
  address,
  tokenSymbol = "ZRV",
  tokenName = "Zarvo",
}: Props) {
  const [copied, setCopied] = useState<CopyMethod | null>(null);
  const [showManual, setShowManual] = useState(false);
  const manualRef = useRef<HTMLInputElement>(null);

  async function onCopy() {
    const method = await copyText(address);
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
      title: `${tokenSymbol} Receive Address`,
      text: `${tokenSymbol} (${tokenName})\n${address}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        /* cancel → fallback */
      }
    }
    await onCopy(); // fallback to copy/manual
  }

  return (
    <div className="mx-auto max-w-xl p-6 text-[#F5F7FA]">
      <div className="rounded-xl bg-[#14161A] p-4 ring-1 ring-[#1f232b]">
        <div className="mb-4 rounded-lg bg-[#1E2026] p-3 text-sm text-[#FFCF4A]">
          ⚠️ Only send digital assets that match with deposit address’s
          blockchain
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-[#FFCF4A] grid place-items-center">
            <QrCode className="h-6 w-6 text-black" />
          </div>
          <div>
            <div className="text-base font-semibold">{tokenSymbol}</div>
            <div className="text-xs text-[#98A2B3]">{tokenName}</div>
          </div>
        </div>

        <div className="mt-6 text-sm text-[#98A2B3]">Address</div>
        <div className="mt-1 break-all font-mono text-lg">{address}</div>

        <div className="mt-6">
          <QRCodeBox value={address} label="Scan to receive" />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1E2026] px-4 py-3 text-sm hover:bg-[#242832]"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button
            onClick={onCopy}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#FFCF4A] px-4 py-3 text-sm font-semibold text-black hover:brightness-95"
          >
            <Copy className="h-4 w-4" />
            {copied ? (copied === "manual" ? "Copy…" : "Copied!") : "Copy"}
          </button>
        </div>
      </div>

      {/* Manual fallback */}
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
              Clipboard is blocked. Select the text and press{" "}
              <kbd className="mx-1 rounded bg-black/30 px-1">Ctrl</kbd>+
              <kbd className="rounded bg-black/30 px-1">C</kbd>.
            </p>
            <input
              ref={manualRef}
              readOnly
              value={address}
              className="mt-3 w-full rounded-md bg-[#1E2026] p-3 font-mono text-sm"
              onFocus={(e) => e.currentTarget.select()}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowManual(false)}
                className="rounded-md bg-[#FFCF4A] px-4 py-2 text-sm font-semibold text-black"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
