import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Trophy, Bell, User } from "lucide-react";
import logo from "../assets/logo.png";

const links = [
  { name: "Home", path: "/" },
  { name: "Wallet", path: "/wallet" },
  { name: "Analytics", path: "/analytics" },
  { name: "Partner", path: "/partner" },
  { name: "Profile", path: "/profile" },
  { name: "About", path: "/about" },
];

const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const activeCls = "text-[#f4c430]";
const idleCls = "text-[#9aa0a6] hover:text-[#f5f6f7]";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Home should be active on "/" and "/home"
  const isHomePath = pathname === "/" || pathname === "/home";

  const getClasses = (name: string, isActive: boolean) => {
    const active = name === "Home" ? isActive || isHomePath : isActive;
    return `${linkBase} ${active ? activeCls : idleCls}`;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-[#0f0f12]/90 border-b border-[#27272f]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between md:h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Zarvo" className="h-20 w-auto" />
          </div>

          {/* Center: Links (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {links.slice(0, 4).map((l) => (
              <NavLink
                key={l.name}
                to={l.path}
                // 'end' ensures "/" doesn't stay active on deeper paths
                end={l.name === "Home" && l.path === "/"}
                className={({ isActive }) => getClasses(l.name, isActive)}
              >
                {l.name}
              </NavLink>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2">
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-[#27272f] bg-[#17171c]"
              aria-label="Rewards"
            >
              <Trophy size={18} className="text-[#9aa0a6]" />
            </button>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-[#27272f] bg-[#17171c]"
              aria-label="Notifications"
            >
              <Bell size={18} className="text-[#9aa0a6]" />
            </button>
            <NavLink
              to="/profile"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#27272f] bg-[#17171c] hover:opacity-90"
              aria-label="Profile"
              title="Profile"
            >
              <User size={18} className="text-[#9aa0a6]" />
            </NavLink>

            {/* Mobile Menu Toggle */}
            <button
              className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-[#27272f] bg-[#17171c] md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X size={18} className="text-[#f5f6f7]" />
              ) : (
                <Menu size={18} className="text-[#f5f6f7]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t border-[#27272f] bg-[#0f0f12]">
          <div className="mx-auto max-w-[1200px] px-4 py-2">
            {links.map((l) => (
              <NavLink
                key={l.name}
                to={l.path}
                end={l.name === "Home" && l.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => getClasses(l.name, isActive)}
              >
                {l.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
