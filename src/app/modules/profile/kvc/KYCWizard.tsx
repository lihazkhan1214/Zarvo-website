import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronLeft, Camera, IdCard, FileText, User2 } from "lucide-react";
import BackButtonAuto from "../../../../components/BackButton";

/** ─────────────────────────── Types ─────────────────────────── */
type DocType = "id_card" | "passport" | "driver_license";

type KycValues = {
  docType: DocType | "";
  front: File | null;
  back: File | null;
  selfie: File | null;
};

/** ───────────────────────── Helper UI ───────────────────────── */
const DOCS: { id: DocType; title: string; icon: React.ReactNode }[] = [
  { id: "id_card", title: "ID Card", icon: <IdCard className="h-5 w-5" /> },
  { id: "passport", title: "Passport", icon: <FileText className="h-5 w-5" /> },
  {
    id: "driver_license",
    title: "Driver License",
    icon: <IdCard className="h-5 w-5" />,
  },
];

const Stepper: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => (
  <div
    className="mt-2 flex items-center gap-2"
    aria-label={`Step ${current} of ${total}`}
  >
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`h-1 flex-1 rounded-full ${
          i < current ? "bg-yellow-400" : "bg-white/15"
        }`}
      />
    ))}
  </div>
);

const UploadBox: React.FC<{
  label: string;
  accept?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  icon?: React.ReactNode;
  error?: string;
}> = ({
  label,
  accept = "image/*,application/pdf",
  value,
  onChange,
  icon,
  error,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (value && value.type?.startsWith("image")) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [value]);

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onChange(f);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`flex aspect-square w-44 sm:w-56 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center hover:bg-white/10 ${
          dragOver ? "ring-2 ring-yellow-400/80" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
        {value ? (
          preview ? (
            <img
              src={preview}
              alt={label}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/80">
              <FileText className="h-8 w-8" />
              <span className="text-xs max-w-[9rem] truncate">
                {value.name}
              </span>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/70">
            {icon ?? <FileText className="h-8 w-8" />}
            <span className="text-xs">{label}</span>
            <span className="text-[10px] text-white/50">
              Click or drag to upload
            </span>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
};

/** ───────────────────── Validation per step ─────────────────── */
const totalSteps = 4; // 1: Start, 2: Select Doc, 3: Upload Doc, 4: Selfie

const schemas: Record<number, Yup.ObjectSchema<any>> = {
  2: Yup.object({
    docType: Yup.mixed<DocType>()
      .oneOf(
        ["id_card", "passport", "driver_license"],
        "Please select a document"
      )
      .required("Please select a document"),
  }),
  3: Yup.object({
    front: Yup.mixed<File>().required("Front image required"),
    back: Yup.mixed<File>().required("Back image required"),
  }),
  4: Yup.object({
    selfie: Yup.mixed<File>().required("Selfie required"),
  }),
};

/** ─────────────────────── Main Wizard Component ─────────────────────── */
export default function KYCWizard({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = React.useState<number>(1);

  const formik = useFormik<KycValues>({
    initialValues: {
      docType: ((localStorage.getItem("zarvo:kyc:doc") as DocType) ||
        "") as KycValues["docType"],
      front: null,
      back: null,
      selfie: null,
    },
    onSubmit: () => {
      alert(
        "KYC package ready (frontend).\nDoc: " +
          (formik.values.docType || "N/A")
      );
      onClose?.();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  React.useEffect(() => {
    if (formik.values.docType)
      localStorage.setItem("zarvo:kyc:doc", String(formik.values.docType));
  }, [formik.values.docType]);

  const next = async () => {
    const schema = schemas[step as keyof typeof schemas];
    if (schema) {
      try {
        await schema.validate(formik.values, { abortEarly: false });
      } catch (e: any) {
        const errs: Record<string, string> = {};
        e.inner?.forEach((it: any) => (errs[it.path] = it.message));
        formik.setErrors(errs);
        return;
      }
    }
    if (step < totalSteps) setStep(step + 1);
    else formik.handleSubmit();
  };

  const back = () => {
    if (step === 1) return onClose?.();
    setStep((s) => Math.max(1, s - 1));
  };

  /** ---------- Step bodies ---------- */
  const Start = (
    <div>
      <div className="mt-12 flex justify-center">
        <User2 className="h-20 w-20 text-white/30" />
      </div>
      <p className="mt-6 text-center text-white/70">
        Verify your identity to start the verification process.
      </p>
    </div>
  );

  const SelectDoc = (
    <div className="space-y-3">
      {DOCS.map((d) => (
        <button
          key={d.id}
          type="button"
          onClick={() => formik.setFieldValue("docType", d.id)}
          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
            formik.values.docType === d.id
              ? "border-yellow-400/60 bg-white/[0.06]"
              : "border-white/10 bg-white/[0.03] hover:bg-white/10"
          }`}
        >
          <div className="text-white/80">{d.icon}</div>
          <div className="text-sm text-white">{d.title}</div>
        </button>
      ))}
      {formik.errors.docType && (
        <p className="text-xs text-red-400">{String(formik.errors.docType)}</p>
      )}
    </div>
  );

  const UploadDoc = (
    <div>
      {/* Upload Boxes */}
      <div className="mt-6 flex justify-center gap-12">
        <div className="flex flex-col items-center">
          <UploadBox
            label="Front"
            value={formik.values.front}
            onChange={(f) => formik.setFieldValue("front", f)}
            icon={<FileText className="h-8 w-8" />}
            error={formik.errors.front as string}
          />
          <span className="mt-2 text-sm text-white/70">Front Side</span>
        </div>

        <div className="flex flex-col items-center">
          <UploadBox
            label="Back"
            value={formik.values.back}
            onChange={(f) => formik.setFieldValue("back", f)}
            icon={<FileText className="h-8 w-8" />}
            error={formik.errors.back as string}
          />
          <span className="mt-2 text-sm text-white/70">Back Side</span>
        </div>
      </div>

      {/* Info Notes */}
      <ul className="mt-6 list-disc text-xs text-white/50 space-y-1 text-left max-w-md mx-auto">
        <li>Use a well-lit area and avoid glare.</li>
        <li>All corners of the document should be visible.</li>
        <li>Supported formats: JPG, PNG, or PDF.</li>
      </ul>
    </div>
  );

  const Selfie = (
    <div className="mt-4">
      <UploadBox
        label="Upload Selfie"
        accept="image/*"
        value={formik.values.selfie}
        onChange={(f) => formik.setFieldValue("selfie", f)}
        icon={<Camera className="h-10 w-10" />}
        error={formik.errors.selfie as string}
      />
    </div>
  );

  const titles = [
    "",
    "KYC Verification",
    "Selected Document",
    "Upload Document",
    "Upload Selfie",
  ];
  const subtitles = [
    "",
    "Verify your identity to start the verification process",
    "Select document option",
    "Make sure your document is clear and concise",
    "Take an image to verify your identity.",
  ];

  /** ---------- Render ---------- */
  return (
    <div className="min-h-[100dvh] bg-[#0E1114] text-white px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <header className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <BackButtonAuto />
            <h1 className="text-lg font-semibold">{titles[step]}</h1>
          </div>
          {subtitles[step] && (
            <p className="px-1 text-sm text-white/60">{subtitles[step]}</p>
          )}
          <Stepper current={step} total={totalSteps} />
        </header>

        {/* Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="rounded-2xl bg-[#1A1C20] ring-1 ring-white/10 p-5"
        >
          {step === 1 && Start}
          {step === 2 && SelectDoc}
          {step === 3 && UploadDoc}
          {step === 4 && Selfie}

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={back}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 text-sm hover:bg-white/10"
            >
              {step === 1 ? "Close" : "Back"}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-yellow-400 py-3 font-semibold text-black"
            >
              {step < totalSteps ? "Continue" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
