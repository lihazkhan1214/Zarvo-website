import { useState } from "react";
import { Download, Gift, Plus, Send, Users } from "lucide-react";
import { IconButton } from "./IconButton";
import { Card } from "../../../../components/Card";

const BalancePanel = () => {
  const balance = 4.2025;
  const ratePerHour = 0.25;
  const invited = 2;
  const invitedCap = 2;
  const [isMining, setIsMining] = useState(false);

  return (
    <Card className="p-8 flex flex-col items-center  shadow-lg rounded-2xl">
      {/* Circular Balance */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-[#2D1E56] "></div>

        {/* Inner Content */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-[#F5C242]">Balance</p>
          <h1 className="text-6xl font-bold text-white mt-2">
            {balance.toFixed(4)}
          </h1>
          <p className="mt-1 text-base text-[#4CAF50]">+{ratePerHour} ZAR/hr</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#9AA0A6]">
            <Users size={16} /> {invited}/{invitedCap} invited
          </p>
        </div>
      </div>

      {/* Mining Button */}
      <button
        className="mt-6 rounded-full px-8 py-3 font-semibold bg-[#F5C242] text-[#101014] hover:scale-105 transition-transform duration-200"
        onClick={() => setIsMining((v) => !v)}
      >
        {isMining ? "Stop Mining" : "Start Mining"}
      </button>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <IconButton label="Send" icon={<Send size={18} />} />
        <IconButton label="Receive" icon={<Download size={18} />} />
        <IconButton label="Buy" icon={<Plus size={18} />} />
        <IconButton label="Redeem" icon={<Gift size={18} />} />
      </div>
    </Card>
  );
};

export default BalancePanel;
