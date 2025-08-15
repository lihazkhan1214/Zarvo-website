import { Trophy } from "lucide-react";
import BackButtonAuto from "../../../components/BackButton";
import Wrapper from "../../../components/Wrapper";

export default function RewardsPage() {
  const rewards = [
    {
      title: "Completed Daily Check-in",
      amount: "5ZRV",
      progress: 100,
      status: "available",
    },
    {
      title: "Refer a Friend",
      amount: "5ZRV",
      progress: 50,
      status: "pending",
    },
    {
      title: "Read Articles on Success Pulse",
      amount: "5ZRV",
      progress: 50,
      status: "pending",
    },
  ];

  const statusColors: Record<string, string> = {
    available: "bg-blue-500",
    pending: "bg-yellow-500",
  };

  const statusLabels: Record<string, string> = {
    available: "Available",
    pending: "Pending",
  };

  return (
    <div className="min-h-screen bg-[#0E0F13] text-white">
      <Wrapper>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <BackButtonAuto />
        </div>

        <div className="space-y-8">
          {/* Summary Card */}
          <div className="rounded-2xl bg-[#14161A] ring-1 ring-white/10 p-6 text-center space-y-3">
            <div className="flex justify-center">
              <Trophy className="h-10 w-10 text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold">Earn More Zarvo!</h2>
            <div className="text-3xl font-bold">125.5 ZRV</div>
            <p className="text-white/70 text-sm">Available to Claim</p>
            <button className="mt-3 px-6 py-2 border border-yellow-400 rounded-xl text-yellow-400 hover:bg-yellow-400 hover:text-black transition">
              Claim Rewards
            </button>
          </div>

          {/* Rewards List */}
          <div className="space-y-4">
            {rewards.map((reward, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#14161A] ring-1 ring-white/10 p-5 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold">{reward.title}</h3>
                  <span className="text-yellow-400 font-semibold">
                    {reward.amount}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${reward.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/60">
                    {reward.progress}% complete
                  </span>
                  <span
                    className={`px-3 py-0.5 text-xs rounded-full capitalize ${
                      reward.status === "available"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {statusLabels[reward.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
