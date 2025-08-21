import React from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  rightHint?: React.ReactNode;
};

const PasswordField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  rightHint,
}) => {
  const [field, meta] = useField<string>(name);
  const [show, setShow] = React.useState(false);
  const err = meta.touched && meta.error;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        {label && (
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
        )}
        {rightHint}
      </div>
      <div
        className={`flex h-12 items-center rounded-xl border bg-white/[0.03] px-3
          ${
            err
              ? "border-red-400/70"
              : "border-white/10 focus-within:border-white/20"
          }`}
      >
        <input
          id={name}
          {...field}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="p-1 text-white/70 hover:text-white"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {err && <p className="mt-1 text-xs text-red-400">{meta.error}</p>}
    </div>
  );
};
export default PasswordField;
