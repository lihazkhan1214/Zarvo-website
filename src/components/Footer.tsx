import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Wallet,
  BarChart2,
  Handshake,
  User,
  Trophy,
  UserPlus,
  Users,
  FileText,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import logo from "../assets/logo.png";

const linkBase =
  "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
const idleCls = "text-[#9aa0a6] hover:text-[#f5f6f7]";
const activeCls = "text-[#f4c430]";

const InternalLink: React.FC<{
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}> = ({ to, label, icon, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `${linkBase} ${isActive ? activeCls : idleCls}`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const ExternalLink: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
}> = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`${linkBase} ${idleCls}`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const SocialButton: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
}> = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="grid h-9 w-9 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] text-[#9aa0a6] hover:text-[#f5f6f7] transition"
  >
    {icon}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 border-t border-[#27272f] bg-[#0f0f12]">
      {/* Top: Logo + link clusters */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Zarvo" className="h-20 w-auto" />
              <span className="inline-block h-2 w-2 rounded-full bg-[#f4c430]" />
            </div>
            <p className="text-sm text-[#9aa0a6] max-w-sm">
              A unified way to mine, send, and redeem — fast, secure, and
              beautifully simple.
            </p>

            {/* Socials */}
            <div className="mt-2 flex items-center gap-2">
              <SocialButton
                href="https://facebook.com"
                label="Facebook"
                icon={<Facebook size={18} />}
              />
              <SocialButton
                href="https://instagram.com"
                label="Instagram"
                icon={<Instagram size={18} />}
              />
              <SocialButton
                href="https://linkedin.com"
                label="LinkedIn"
                icon={<Linkedin size={18} />}
              />
              <SocialButton
                href="https://twitter.com"
                label="Twitter"
                icon={<Twitter size={18} />}
              />
            </div>
          </div>

          {/* App Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#f5f6f7]/80 mb-3">
              App
            </h4>
            <nav className="flex flex-wrap gap-2">
              <InternalLink to="/" end label="Home" icon={<Home size={16} />} />
              <InternalLink
                to="/wallet"
                label="Wallet"
                icon={<Wallet size={16} />}
              />
              <InternalLink
                to="/analytics"
                label="Analytics"
                icon={<BarChart2 size={16} />}
              />
              <InternalLink
                to="/partner"
                label="Partner"
                icon={<Handshake size={16} />}
              />
              <InternalLink
                to="/profile"
                label="Profile"
                icon={<User size={16} />}
              />
              <InternalLink
                to="/rewards"
                label="Rewards"
                icon={<Trophy size={16} />}
              />
            </nav>
          </div>

          {/* Community & More */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#f5f6f7]/80 mb-3">
              Community
            </h4>
            <nav className="flex flex-wrap gap-2">
              <ExternalLink
                href="https://notion.so"
                label="Notion"
                icon={<FileText size={16} />}
              />
              <InternalLink
                to="/invite"
                label="Invite"
                icon={<UserPlus size={16} />}
              />
              <InternalLink
                to="/team"
                label="Team"
                icon={<Users size={16} />}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#27272f]">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#9aa0a6]">
            © {new Date().getFullYear()} Zarvo. All rights reserved.
          </p>

          {/* Quick bottom nav (icons) */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `grid h-9 px-3 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] text-xs ${
                  isActive
                    ? "text-[#f4c430]"
                    : "text-[#9aa0a6] hover:text-[#f5f6f7]"
                }`
              }
            >
              <Home size={16} />
            </NavLink>
            <NavLink
              to="/wallet"
              className={({ isActive }) =>
                `grid h-9 px-3 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] text-xs ${
                  isActive
                    ? "text-[#f4c430]"
                    : "text-[#9aa0a6] hover:text-[#f5f6f7]"
                }`
              }
            >
              <Wallet size={16} />
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `grid h-9 px-3 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] text-xs ${
                  isActive
                    ? "text-[#f4c430]"
                    : "text-[#9aa0a6] hover:text-[#f5f6f7]"
                }`
              }
            >
              <BarChart2 size={16} />
            </NavLink>
            <NavLink
              to="/partner"
              className={({ isActive }) =>
                `grid h-9 px-3 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] text-xs ${
                  isActive
                    ? "text-[#f4c430]"
                    : "text-[#9aa0a6] hover:text-[#f5f6f7]"
                }`
              }
            >
              <Handshake size={16} />
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `grid h-9 px-3 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] text-xs ${
                  isActive
                    ? "text-[#f4c430]"
                    : "text-[#9aa0a6] hover:text-[#f5f6f7]"
                }`
              }
            >
              <User size={16} />
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
