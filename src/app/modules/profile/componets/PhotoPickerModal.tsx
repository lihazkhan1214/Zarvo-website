import { useRef, type Dispatch, type SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onPick: (file: File) => void;
};

export default function PhotoPickerModal({ open, setOpen, onPick }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const pickFromAlbum = () => fileRef.current?.click();

  const takePhoto = () => {
    // simplest web path: also open file input with capture hint
    fileRef.current?.setAttribute("capture", "environment");
    fileRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
      />
      <div className="mt-16 w-full max-w-sm rounded-2xl border border-white/10 bg-[#121317] p-3 text-white/90 shadow-xl">
        <div className="px-4 py-3 text-center text-base">Edit Profile</div>
        <div className="divide-y divide-white/10 rounded-xl bg-[#0F1014]">
          <button
            onClick={takePhoto}
            className="w-full px-4 py-3 text-left hover:bg-white/5"
          >
            Take Photo
          </button>
          <button
            onClick={pickFromAlbum}
            className="w-full px-4 py-3 text-left hover:bg-white/5"
          >
            Album
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full px-4 py-3 text-left hover:bg-white/5"
          >
            Cancel
          </button>
        </div>

        {/* hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}
