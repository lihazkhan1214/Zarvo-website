import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User2,
  Users,
  Calendar,
  Camera,
  Bell,
  Globe,
  LogOut,
  Copy,
  ChevronRight,
} from "lucide-react";
import Wrapper from "../../../components/Wrapper";
import Avatar from "./componets/Avatar";
import Tile from "./componets/Tile";
import SignOutModal from "./componets/SignOutModal";
import InviteSlider from "../home/components/InviteSlider";

function ProfilePage() {
  const [showSignout, setShowSignout] = useState(false);

  return (
    <Wrapper>
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <Avatar size={56} src="https://i.pravatar.cc/150?img=3" />
        <div className="flex-1">
          <div className="text-sm text-white/90">Profile name</div>
          <div className="text-xs text-white/50">reference code</div>
        </div>
        <Link
          to="/profile/detail"
          className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          <ChevronRight />
        </Link>
      </div>

      {/* Socials */}
      <div className="mt-6">
        <p className="text-sm text-white/70">Follow us on social media</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {["Telegram", "Instagram", "LinkedIn", "Facebook", "Discord"].map(
            (s) => (
              <span
                key={s}
                className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10 text-white/80"
              >
                {s}
              </span>
            )
          )}
        </div>
      </div>

      <InviteSlider bg="#1A1C20" />

      {/* Settings List */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Tile
          icon={<User2 className="h-5 w-5" />}
          title="Invitation code"
          subtitle="lihat##dd"
          right={<Copy className="h-4 w-4" />}
        />
        <Tile
          icon={<Users className="h-5 w-5" />}
          title="Referral Team"
          to="/refferal"
          right={<ChevronRight />}
        />
        <Tile
          icon={<Calendar className="h-5 w-5" />}
          title="Security Setting"
          to="/profile/security"
          right={<ChevronRight />}
        />
        <Tile
          icon={<Camera className="h-5 w-5" />}
          title="KYC Verification"
          to="/profile/kyc"
          right={<ChevronRight />}
        />
        <Tile
          icon={<Bell className="h-5 w-5" />}
          title="Notification"
          to="/profile/notification"
          right={<ChevronRight />}
        />
        <Tile
          icon={<Globe className="h-5 w-5" />}
          title="Language"
          to="/profile/language"
          right={<ChevronRight />}
        />
        <Tile
          icon={<LogOut className="h-5 w-5" />}
          title="Sign out"
          onClick={() => setShowSignout(true)}
          right={<ChevronRight />}
        />
      </div>

      {/* Sign Out Modal */}
      <SignOutModal
        open={showSignout}
        onCancel={() => setShowSignout(false)}
        onConfirm={() => {
          setShowSignout(false);
          alert("signed out");
        }}
      />
    </Wrapper>
  );
}

export default ProfilePage;
