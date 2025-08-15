import { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Decimal from "decimal.js-light";
import clsx from "clsx";
import { Maximize } from "lucide-react";

type Props = {
  tokenSymbol?: string; // e.g., "ZRV"
  balance?: string; // user's available balance as string, e.g. "100.5"
  feeMode?: "flat" | "percent"; // flat amount or percentage of amount
  feeValue?: string; // "0.30" (flat) or "1" (%) as string
  onSubmit?: (payload: {
    recipient: string;
    amount: string;
    memo?: string;
    fee: string;
    total: string;
  }) => Promise<void> | void;
  addressHint?: string; // helper text under recipient
  className?: string;
};

const DEFAULTS: Required<
  Omit<Props, "onSubmit" | "className" | "addressHint">
> = {
  tokenSymbol: "ZRV",
  balance: "0",
  feeMode: "flat",
  feeValue: "0.30",
};

function isLikelyAddress(v: string) {
  // Permissive: hex (0x...), Solana-like base58, or BTC-like
  const hex = /^0x[a-fA-F0-9]{40,}$/;
  const b58 = /^[1-9A-HJ-NP-Za-km-z]{25,50}$/; // excludes 0,O,I,l
  return hex.test(v) || b58.test(v);
}

export default function SendCard(props: Props) {
  const {
    tokenSymbol,
    balance,
    feeMode,
    feeValue,
    onSubmit,
    addressHint,
    className = "",
  } = { ...DEFAULTS, ...props };

  const [sending, setSending] = useState(false);

  const schema = useMemo(
    () =>
      Yup.object({
        recipient: Yup.string()
          .trim()
          .required("Recipient is required")
          .test(
            "addr",
            "Invalid address format",
            (v) => !!v && isLikelyAddress(v)
          ),
        amount: Yup.string()
          .required("Amount is required")
          .test("num", "Enter a valid number", (v) => {
            try {
              return new Decimal(v || "0").gt(0);
            } catch {
              return false;
            }
          })
          .test("balance", "Amount exceeds available balance", (v) => {
            try {
              const amt = new Decimal(v || "0");
              const bal = new Decimal(balance);
              const fee = calcFee(amt, feeMode, feeValue);
              const total = amt.plus(fee);
              return total.lte(bal);
            } catch {
              return false;
            }
          }),
        memo: Yup.string()
          .max(140, "Memo must be 140 characters or less")
          .optional(),
      }),
    [balance, feeMode, feeValue]
  );

  return (
    <div className={clsx("mx-auto w-full max-w-2xl", className)}>
      <div className="rounded-2xl bg-[#14161A] ring-1 ring-[#1f232b] overflow-hidden text-[#F5F7FA]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/5">
          <h2 className="text-base font-semibold">Send</h2>
          <button
            type="button"
            className="rounded-md p-2 hover:bg-white/10"
            title="Fullscreen"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>

        <Formik
          initialValues={{ recipient: "", amount: "", memo: "" }}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            const amt = new Decimal(values.amount || "0");
            const fee = calcFee(amt, feeMode, feeValue);
            const total = amt.plus(fee);

            try {
              setSending(true);
              await onSubmit?.({
                recipient: values.recipient.trim(),
                amount: amt.toString(),
                memo: values.memo?.trim() || undefined,
                fee: fee.toString(),
                total: total.toString(),
              });
              // demo: simulate success if no onSubmit provided
              if (!onSubmit) await new Promise((r) => setTimeout(r, 600));
              resetForm();
            } finally {
              setSending(false);
            }
          }}
        >
          {({ values, setFieldValue, isValid, touched, errors }) => {
            const amt = safeDecimal(values.amount);
            const fee = calcFee(amt, feeMode, feeValue);
            const total = amt.plus(fee);
            const bal = safeDecimal(balance);
            const remaining = bal.minus(total);

            // compute MAX amount (without Decimal.max)
            const maxAmount =
              feeMode === "flat"
                ? maxDecimal(bal.minus(fee), new Decimal(0))
                : bal.div(new Decimal(1).plus(new Decimal(feeValue).div(100)));

            const setMax = () => {
              const v = maxAmount.toSignificantDigits(12).toString();
              setFieldValue("amount", v);
            };

            const showRecipErr = touched.recipient && errors.recipient;
            const showAmtErr = touched.amount && errors.amount;

            return (
              <Form className="px-6 py-6">
                {/* Recipient */}
                <label className="block text-sm text-[#98A2B3]">
                  Recipient
                </label>
                <div className="mt-2">
                  <Field
                    name="recipient"
                    placeholder="Enter your recipient address"
                    className={clsx(
                      "w-full rounded-lg bg-[#0f1115] px-3 py-3 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCF4A]/60 placeholder-white/30",
                      showRecipErr && "ring-red-500/60 focus:ring-red-400"
                    )}
                  />
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span
                      className={clsx(
                        "text-white/45",
                        showRecipErr && "text-red-400"
                      )}
                    >
                      {addressHint ?? "Paste a valid wallet address."}
                    </span>
                    <ErrorMessage name="recipient">
                      {(m) => <span className="text-red-400">{m}</span>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Amount */}
                <label className="mt-5 block text-sm text-[#98A2B3]">
                  Amount
                </label>
                <div className="mt-2 flex gap-2">
                  <Field
                    name="amount"
                    placeholder={`Enter your amount ${tokenSymbol}`}
                    inputMode="decimal"
                    className={clsx(
                      "w-full rounded-lg bg-[#0f1115] px-3 py-3 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCF4A]/60 placeholder-white/30",
                      showAmtErr && "ring-red-500/60 focus:ring-red-400"
                    )}
                  />
                  <button
                    type="button"
                    onClick={setMax}
                    className="rounded-lg bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                    title="Use maximum"
                  >
                    MAX
                  </button>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <div className="text-white/60">
                    Balance:{" "}
                    <span className="font-mono">
                      {bal.toString()} {tokenSymbol}
                    </span>
                  </div>
                  <ErrorMessage name="amount">
                    {(m) => <span className="text-red-400">{m}</span>}
                  </ErrorMessage>
                </div>

                {/* Memo */}
                <label className="mt-5 block text-sm text-[#98A2B3]">
                  Memo <span className="text-white/35">(optional)</span>
                </label>
                <Field
                  name="memo"
                  placeholder="Enter your memo"
                  className="mt-2 w-full rounded-lg bg-[#0f1115] px-3 py-3 text-sm ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCF4A]/60 placeholder-white/30"
                />

                {/* Summary */}
                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Network fee</span>
                    <span className="font-medium">
                      {fee.toString()} {tokenSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">You’ll send</span>
                    <span className="font-medium">
                      {amt.toString()} {tokenSymbol}
                    </span>
                  </div>
                  <div className="my-2 h-px w-full bg-white/10" />
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-extrabold">
                      {total.toString()} {tokenSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Remaining after send</span>
                    <span
                      className={remaining.isNegative() ? "text-red-400" : ""}
                    >
                      {maxDecimal(remaining, new Decimal(0)).toString()}{" "}
                      {tokenSymbol}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || sending}
                  className={clsx(
                    "mt-6 w-full rounded-xl bg-[#FFCF4A] py-3 text-black font-semibold hover:brightness-95 transition",
                    (!isValid || sending) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function safeDecimal(v?: string | number): Decimal {
  try {
    return new Decimal(v ?? 0);
  } catch {
    return new Decimal(0);
  }
}

/** decimal "max" without using a static method */
function maxDecimal(a: Decimal, b: Decimal): Decimal {
  return a.greaterThan(b) ? a : b;
}

function calcFee(
  amount: Decimal,
  mode: "flat" | "percent",
  value: string
): Decimal {
  if (mode === "percent") {
    const pct = new Decimal(value || "0").div(100);
    return amount.mul(pct).toDecimalPlaces(8, Decimal.ROUND_HALF_UP);
  }
  return safeDecimal(value).toDecimalPlaces(8, Decimal.ROUND_HALF_UP);
}
