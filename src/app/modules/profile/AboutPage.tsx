import React from "react";
import Wrapper from "../../../components/Wrapper";
import BackButtonAuto from "../../../components/BackButton";
import {
  ChevronDown,
  Info,
  Target,
  Mail,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react";

/* ---------- Small UI helpers ---------- */

const SectionCard: React.FC<
  React.PropsWithChildren<{ title: string; icon?: React.ReactNode }>
> = ({ title, icon, children }) => (
  <div className="rounded-2xl bg-[#1A1C20] p-4 ring-1 ring-white/10">
    <div className="mb-2 flex items-center gap-2">
      {icon}
      <h3 className="text-base font-semibold text-white">{title}</h3>
    </div>
    <div className="text-sm leading-6 text-white/80">{children}</div>
  </div>
);

type AccItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

const AccordionItem: React.FC<{
  open: boolean;
  onToggle: () => void;
  title: string;
  icon: React.ReactNode;
}> = ({ open, onToggle, title, icon }) => (
  <div className="rounded-xl bg-[#1A1C20] ring-1 ring-white/10">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/5"
    >
      <div className="flex items-center gap-2">
        <span className="text-white/80">{icon}</span>
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <ChevronDown
        className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>
    {open && (
      <div className="px-4 pb-4 text-sm text-white/70">
        {/* content rendered by parent below the item header */}
      </div>
    )}
  </div>
);

/* ---------- Page ---------- */

const AboutPage: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const items: AccItem[] = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-2">
          <p>
            We respect your privacy. Zarvo collects only the data needed to
            operate the service, verify identity (KYC), and comply with
            regulations. We never sell your personal data.
          </p>
          <ul className="list-disc pl-5">
            <li>Data is encrypted in transit and at rest.</li>
            <li>You can request data export or deletion at any time.</li>
            <li>KYC documents are stored securely with limited access.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-2">
          <p>
            By using Zarvo you agree to follow applicable laws and our community
            guidelines. Do not use the platform for illegal activity or abuse.
          </p>
          <p className="text-white/60 text-xs">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      id: "help",
      title: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-2">
          <p>
            Need assistance? Check the FAQ or reach our team — we usually reply
            within 24 hours on business days.
          </p>
          <a
            href="mailto:support@zarvo.com"
            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            support@zarvo.com
          </a>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <BackButtonAuto />
        <h1 className="text-lg font-semibold">About</h1>
      </div>

      {/* Top sections */}
      <div className="grid gap-4">
        <SectionCard
          title="What is Zarvo"
          icon={<Info className="h-5 w-5 text-white/70" />}
        >
          Zarvo is a cryptocurrency mining and networking platform that aims to
          create a decentralized community and reward its users for contributing
          to the network.
        </SectionCard>

        <SectionCard
          title="Our Mission"
          icon={<Target className="h-5 w-5 text-white/70" />}
        >
          To empower people worldwide by providing a fair and accessible way to
          earn cryptocurrency, learn, and engage in community building.
        </SectionCard>

        <SectionCard
          title="Contact Us"
          icon={<Mail className="h-5 w-5 text-white/70" />}
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:support@zarvo.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              support@zarvo.com
            </a>
            <span className="text-xs text-white/50">
              We reply within 24 hours (Mon–Fri)
            </span>
          </div>
        </SectionCard>
      </div>

      {/* Accordion */}
      <div className="mt-5 grid gap-3">
        {items.map((it) => (
          <div key={it.id} className="overflow-hidden">
            <AccordionItem
              open={openId === it.id}
              onToggle={() => setOpenId((o) => (o === it.id ? null : it.id))}
              title={it.title}
              icon={it.icon}
            />
            {openId === it.id && (
              <div className="rounded-b-xl bg-[#1A1C20] px-4 pb-4 ring-1 ring-white/10">
                <div className="pt-1 text-sm text-white/70">{it.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default AboutPage;
