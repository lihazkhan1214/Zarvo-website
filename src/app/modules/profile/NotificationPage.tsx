import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Wrapper from "../../../components/Wrapper";
import BackButtonAuto from "../../../components/BackButton";

/* ------------------------------- Toggle UI ------------------------------- */
const Toggle: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? "bg-yellow-400/90" : "bg-white/15"
    }`}
    aria-pressed={checked}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-[#0E1114] transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const Row: React.FC<{
  label: string;
  right?: React.ReactNode;
  onClick?: () => void;
}> = ({ label, right, onClick }) => (
  <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
    <div className="text-sm text-white">{label}</div>
    <div>{right}</div>
  </div>
);

export const NotificationSettingPage: React.FC = () => {
  const [ann, setAnn] = useState(
    () => localStorage.getItem("zarvo:noti:ann") === "1"
  );
  const [push, setPush] = useState(
    () => localStorage.getItem("zarvo:noti:push") === "1"
  );
  const [eventR, setEventR] = useState(
    () => localStorage.getItem("zarvo:noti:event") === "1"
  );
  const [earnR, setEarnR] = useState(
    () => localStorage.getItem("zarvo:noti:earn") === "1"
  );

  useEffect(() => {
    localStorage.setItem("zarvo:noti:ann", ann ? "1" : "0");
  }, [ann]);
  useEffect(() => {
    localStorage.setItem("zarvo:noti:push", push ? "1" : "0");
  }, [push]);
  useEffect(() => {
    localStorage.setItem("zarvo:noti:event", eventR ? "1" : "0");
  }, [eventR]);
  useEffect(() => {
    localStorage.setItem("zarvo:noti:earn", earnR ? "1" : "0");
  }, [earnR]);

  return (
    <Wrapper>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <BackButtonAuto />
        <h1 className="text-lg font-semibold">Notification Setting</h1>
      </div>

      <div className="rounded-2xl bg-[#1A1C20] ring-1 ring-white/10 overflow-hidden">
        <Row
          label="Announcement feed"
          right={<Toggle checked={ann} onChange={setAnn} />}
        />
        <Row
          label="Push notifications"
          right={<Toggle checked={push} onChange={setPush} />}
        />
        <Row
          label="Event Reminder"
          right={<Toggle checked={eventR} onChange={setEventR} />}
        />
        <Row
          label="Zarvo Earning Reminder"
          right={<Toggle checked={earnR} onChange={setEarnR} />}
        />
      </div>
    </Wrapper>
  );
};
