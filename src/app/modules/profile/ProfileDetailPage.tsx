import { Link } from "react-router-dom";
import { Calendar, Pickaxe, Pencil, Copy } from "lucide-react";
import Wrapper from "../../../components/Wrapper";
import Avatar from "./componets/Avatar";
import BackButtonAuto from "../../../components/BackButton";

export default function ProfileDetailPage() {
  const name = "Salman khan";
  const code = "lihat##dd";
  const days = 4;
  const team = 2;
  const zarvo = 10;
  const mints = 0;

  return (
    <Wrapper>
      {/* Top back + edit */}
      <div className="flex items-center justify-between">
        <BackButtonAuto />
        {/* <Link to="/profile" className="text-white/80 hover:text-white">
          ‹
        </Link> */}
        <Link
          to="/profile/edit"
          className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
        >
          <Pencil className="h-4 w-4" /> Edit
        </Link>
      </div>

      {/* Header */}
      <div className="mt-6 flex flex-col items-center">
        <Avatar size={92} src="https://i.pravatar.cc/150?img=3" />
        <div className="mt-3 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white">#{name}</h2>
          <Pencil className="h-4 w-4 text-white/70" />
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
          <span>{code}</span>
          <Copy className="h-4 w-4" />
        </div>
        <button className="mt-1 text-xs text-white/50 hover:text-white/70">
          Add bio
        </button>
      </div>

      {/* Joined & Mint row */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-white/80">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Joined {days} days
        </div>
        <div className="h-5 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <Pickaxe className="h-4 w-4" />
          Mint {mints} times
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 rounded-xl border border-white/10 py-4 text-center">
        <div>
          <div className="text-lg font-semibold text-white">{team}</div>
          <div className="mt-1 text-xs text-white/60">Team member</div>
        </div>
        <div className="border-l border-white/10">
          <div className="text-lg font-semibold text-white">{zarvo}</div>
          <div className="mt-1 text-xs text-white/60">Zarvo</div>
        </div>
      </div>

      {/* bg flare (subtle) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(103,58,183,0.25),transparent_60%)]" />
    </Wrapper>
  );
}
