import ReceiveCard from "./components/ReceiveCard";
import BackButton from "../../../components/BackButton";

function RecievePage() {
  return (
    <div className="min-h-screen bg-[#0E0F13] text-white flex flex-col">
      {/* Header with Back Button */}
      <header className="flex items-center gap-3 px-4 py-3 ">
        <BackButton to="/wallet" />
        <h1 className="text-lg font-semibold ml-2">Receive</h1>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <ReceiveCard
          address="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
          tokenSymbol="ZRV"
          tokenName="Zarvo"
        />
      </main>
    </div>
  );
}

export default RecievePage;
