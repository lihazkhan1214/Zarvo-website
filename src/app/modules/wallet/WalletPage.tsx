import React, { useState } from "react";
import {
  QrCode,
  Copy,
  Grid3X3,
  Send,
  Download,
  History,
  ChevronRight,
} from "lucide-react";
import { Card } from "../../../components/Card";
import { IconButton } from "../../../components/IconButton";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";

type Token = {
  symbol: string;
  name: string;
  icon?: string; // optional image path
  amount: number;
  color?: string; // badge bg
};

const TOKENS: Token[] = [
  { symbol: "ETH", name: "Ethereum", amount: 5, color: "#627EEA" },
  { symbol: "BTC", name: "Bitcoin", amount: 5, color: "#F7931A" },
];

const WalletPage: React.FC = () => {
  const [tab, setTab] = useState<"tokens" | "nfts">("tokens");
  const navigate = useNavigate();

  const address = "GKE25K";
  const balanceZRV = 2547.89;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {}
  };

  return (
    <Wrapper>
      {/* Page header */}
      <div className="mx-auto w-full max-w-7xl px-6   flex items-center justify-between">
        <div className="text-xl font-semibold">Wallet</div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg bg-white/5 hover:bg-white/10 p-2"
            aria-label="QR"
          >
            <QrCode size={18} />
          </button>
          <button
            className="rounded-lg bg-white/5 hover:bg-white/10 p-2"
            aria-label="Grid"
          >
            <Grid3X3 size={18} />
          </button>
        </div>
      </div>

      {/* Summary card */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-10">
        <Card className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12121A] to-[#1A1A25] ring-1 ring-white/10">
          <div className="p-6">
            {/* Address */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <img
                src="/assets/zarvo-badge.svg"
                onError={({ currentTarget }) =>
                  (currentTarget.style.display = "none")
                }
                alt=""
                className="h-4 w-4"
              />
              <span className="font-medium">{address}</span>
              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs hover:bg-white/10"
              >
                <Copy size={14} /> Copy
              </button>
            </div>

            {/* Balances */}
            <div className="mt-4 text-3xl md:text-4xl font-bold">
              {balanceZRV.toLocaleString()}{" "}
              <span className="text-[#F5C242]">ZRV</span>
            </div>
            <div className="mt-2 text-white/70">
              Available Balance:{" "}
              <span className="font-semibold">
                {balanceZRV.toLocaleString()}
              </span>
            </div>

            {/* Actions (IconButton component) */}
            <div className="mt-6 flex flex-wrap gap-3">
              <IconButton
                label="Send"
                icon={<Send size={18} onClick={() => navigate("/send")} />}
              />
              <IconButton
                label="Receive"
                icon={
                  <Download size={18} onClick={() => navigate("/recieve")} />
                }
              />
              <IconButton
                label="History"
                icon={
                  <History size={18} onClick={() => navigate("/history")} />
                }
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center gap-6 border-b border-white/10">
          <button
            className={`pb-3 text-sm ${
              tab === "tokens"
                ? "text-white border-b-2 border-[#F5C242]"
                : "text-white/60 hover:text-white"
            }`}
            onClick={() => setTab("tokens")}
          >
            Tokens
          </button>
          <button
            className={`pb-3 text-sm ${
              tab === "nfts"
                ? "text-white border-b-2 border-[#F5C242]"
                : "text-white/60 hover:text-white"
            }`}
            onClick={() => setTab("nfts")}
          >
            NFTs
          </button>
        </div>
      </div>

      {/* Tokens list (no USD) */}
      {tab === "tokens" ? (
        <div className="mx-auto w-full max-w-7xl px-6 py-6">
          <Card className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="grid grid-cols-12 px-6 py-3 text-xs text-white/50">
              <div className="col-span-9 sm:col-span-9">Asset</div>
              <div className="col-span-2 sm:col-span-2 text-right">Amount</div>
              <div className="col-span-1 sm:col-span-1" />
            </div>
            <div className="divide-y divide-white/10">
              {TOKENS.map((t) => (
                <button
                  key={t.symbol}
                  className="grid w-full grid-cols-12 items-center px-6 py-4 text-left hover:bg-white/5 transition"
                >
                  <div className="col-span-9 flex items-center gap-3">
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ background: t.color ?? "#333" }}
                    >
                      {t.symbol[0]}
                    </div>
                    <div>
                      <div className="font-medium">{t.symbol}</div>
                      <div className="text-xs text-white/60">{t.name}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    {t.amount}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <ChevronRight size={18} className="text-white/30" />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-6 py-10">
          <Card className="rounded-2xl p-10 text-center text-white/60 ring-1 ring-white/10">
            Your NFTs will appear here.
          </Card>
        </div>
      )}

      <div className="h-16" />
    </Wrapper>
  );
};

export default WalletPage;
