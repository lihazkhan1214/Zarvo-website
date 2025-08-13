export const IconButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-[#1B1C26] text-text border border-white/5 hover:opacity-90 transition"
  >
    {icon}
    <span>{label}</span>
  </button>
);
