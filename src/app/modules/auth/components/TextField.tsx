import React from "react";
import { useField } from "formik";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
};

const TextField: React.FC<Props> = ({ name, label, placeholder, type }) => {
  const [field, meta] = useField<string>(name);
  const hasErr = meta.touched && !!meta.error;

  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-1 block text-sm">
          {label}
        </label>
      )}
      <input
        id={name}
        {...field}
        type={type || "text"}
        placeholder={placeholder}
        className={`h-12 w-full rounded-xl border bg-white/[0.03] px-3 text-sm outline-none placeholder:text-white/40
        ${
          hasErr ? "border-red-400/70" : "border-white/10 focus:border-white/20"
        }`}
      />
      {hasErr && (
        <p className="mt-1 text-xs text-red-400">{String(meta.error)}</p>
      )}
    </div>
  );
};

export default TextField;
