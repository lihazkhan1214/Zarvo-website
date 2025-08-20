type SignOutModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function SignOutModal({
  open,
  onCancel,
  onConfirm,
}: SignOutModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="rounded-xl bg-[#1A1C20] p-6 text-white shadow-lg">
        <p className="mb-4">Are you sure you want to sign out?</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg bg-gray-600 px-4 py-2 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-[#F5C242] px-4 py-2 hover:bg-yellow-400"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
