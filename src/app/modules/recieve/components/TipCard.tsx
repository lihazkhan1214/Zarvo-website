import { ShieldCheck, Info } from "lucide-react";

export function TipCard() {
  return (
    <aside className="rounded-xl bg-[#14161A] ring-1 ring-white/10 p-4">
      <div className="flex items-center gap-2 text-white/90 font-medium">
        <ShieldCheck className="h-5 w-5 text-emerald-400" />
        Safety tips
      </div>
      <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc pl-5">
        <li>Only send assets on the correct blockchain.</li>
        <li>Test first with a small amount.</li>
        <li>Never share private keys or seed phrases.</li>
      </ul>
      <div className="mt-4 flex items-start gap-2 text-xs text-white/60">
        <Info className="h-4 w-4 mt-0.5" />
        QR codes are static. If you rotate addresses, refresh this page.
      </div>
    </aside>
  );
}
