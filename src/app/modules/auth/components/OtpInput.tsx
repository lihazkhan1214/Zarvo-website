import React from "react";

type Props = {
  value: string;
  length?: number;
  onChange: (v: string) => void;
};

const OtpInput: React.FC<Props> = ({ value, onChange, length = 6 }) => {
  const inputs = React.useRef<Array<HTMLInputElement | null>>([]);

  const setVal = (i: number, v: string) => {
    if (!/^[0-9]?$/.test(v)) return;
    const next = value.split("");
    next[i] = v;
    const str = Array.from({ length }, (_, k) => next[k] || "").join("");
    onChange(str);
    if (v && i < length - 1) inputs.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0)
      inputs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1)
      inputs.current[i + 1]?.focus();
  };

  const onPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!text) return;
    e.preventDefault();
    const filled = (value + " ".repeat(length)).split("");
    for (let i = 0; i < text.length; i++) filled[i] = text[i];
    onChange(filled.slice(0, length).join(""));
    inputs.current[Math.min(text.length, length - 1)]?.focus();
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          // FIX: return void from ref callback
          ref={(el: HTMLInputElement | null) => {
            inputs.current[i] = el;
          }}
          value={value[i] || ""}
          onChange={(e) => setVal(i, e.target.value.slice(-1))}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
          className="h-12 w-12 rounded-xl border border-white/10 bg-white/[0.03] text-center text-lg outline-none focus:border-white/20"
        />
      ))}
    </div>
  );
};

export default OtpInput;
