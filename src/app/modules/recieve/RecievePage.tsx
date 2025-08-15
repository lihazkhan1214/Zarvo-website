import BackButton from "../../../components/BackButton";
import ReceiveCard from "./components/ReceiveCard";
import { useState } from "react";
import { Download } from "lucide-react";
import Toast from "../../../components/Toast";
import { TipCard } from "./components/TipCard";

function RecievePage() {
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({
    show: false,
    msg: "",
  });

  //   const handleCopied = () => setToast({ show: true, msg: "Address copied" });
  //   const handleShared = () =>
  //     setToast({ show: true, msg: "Share dialog opened" });

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#0E0F13] text-white flex flex-col">
      {/* Top bar */}
      <header className="px-8 py-5 flex items-center justify-between">
        <BackButton />

        <a
          href="#download-app"
          className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-4 py-2 text-sm"
        >
          <Download className="h-4 w-4" />
          Get Zarvo App
        </a>
      </header>

      {/* Full-width content */}
      <main className="flex-1 px-8 py-10 flex flex-col lg:flex-row gap-8">
        {/* Main card - stretches more on desktop */}
        <div className="flex-1 flex items-center justify-center">
          <ReceiveCard
            address="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            tokenSymbol="ZRV"
            tokenName="Zarvo"
            // onCopied={handleCopied}
            // onShared={handleShared}
          />
        </div>

        {/* Sidebar tips / secondary content */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <TipCard />
          <div
            id="download-app"
            className="rounded-xl bg-[#14161A] ring-1 ring-white/10 p-5"
          >
            <h3 className="font-medium text-lg">Use the mobile app</h3>
            <p className="mt-2 text-sm text-white/70">
              Scan and receive instantly using Zarvo mobile. Faster sharing,
              better security.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                className="rounded-md bg-white text-black text-sm font-semibold px-3 py-2 hover:opacity-90"
                href="#"
              >
                Google Play
              </a>
              <a
                className="rounded-md bg-white/10 text-sm px-3 py-2 hover:bg-white/15"
                href="#"
              >
                App Store
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Toast feedback */}
      <Toast
        show={toast.show}
        message={toast.msg}
        onHide={() => setToast({ show: false, msg: "" })}
      />
    </div>
  );
}

export default RecievePage;
