import { useEffect, useState } from "react";

type Props = {
  show: boolean;
  message: string;
  onHide?: () => void;
  duration?: number;
};
export default function Toast({
  show,
  message,
  onHide,
  duration = 1500,
}: Props) {
  const [open, setOpen] = useState(show);
  useEffect(() => {
    setOpen(show);
    if (show) {
      const t = setTimeout(() => {
        setOpen(false);
        onHide?.();
      }, duration);
      return () => clearTimeout(t);
    }
  }, [show, duration, onHide]);
  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm text-white shadow-lg ring-1 ring-white/15">
        {message}
      </div>
    </div>
  );
}
