import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Fingerprint as FingerIcon,
  X,
} from "lucide-react";

import Wrapper from "../../../components/Wrapper";
import Tile from "./componets/Tile";
import BackButtonAuto from "../../../components/BackButton";

/* --------------------------------- Helpers -------------------------------- */

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

const InputField: React.FC<{
  name: string;
  type?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  right?: React.ReactNode;
}> = ({ name, type = "text", placeholder, leftIcon, right }) => (
  <div className="group">
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 focus-within:border-white/20 h-12">
      {leftIcon}
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm placeholder:text-white/40"
      />
      {right}
    </div>
    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-xs text-red-400"
    />
  </div>
);

/* --------------------------- Password Validation --------------------------- */

const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "One lowercase")
    .matches(/[A-Z]/, "One uppercase")
    .matches(/[0-9]/, "One number")
    .matches(/[^A-Za-z0-9]/, "One special char"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Required"),
}).test("not-same", "New password must be different", function (values) {
  return values.newPassword !== values.currentPassword;
});

const StrengthBar: React.FC<{ value: string }> = ({ value }) => {
  const score = useMemo(() => {
    let s = 0;
    if (value.length >= 8) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/[a-z]/.test(value)) s++;
    if (/[0-9]/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return Math.min(4, Math.max(0, s - 1));
  }, [value]);

  return (
    <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        style={{ width: `${(score + 1) * 20}%` }}
        className={`h-full ${
          score >= 3
            ? "bg-green-400/90"
            : score >= 2
            ? "bg-yellow-400/90"
            : "bg-red-400/90"
        }`}
      />
    </div>
  );
};

/* --------------------------- Modal Component --------------------------- */

const ChangePasswordModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [show, setShow] = useState({ cur: false, nw: false, cf: false });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl bg-[#1A1C20] p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await new Promise((r) => setTimeout(r, 500));
            setSubmitting(false);
            resetForm();
            onClose();
            alert("Password changed successfully!");
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-5">
              <InputField
                name="currentPassword"
                type={show.cur ? "text" : "password"}
                placeholder="Enter your current password"
                leftIcon={<Lock className="h-4 w-4 opacity-60" />}
                right={
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, cur: !s.cur }))}
                    className="p-1 opacity-70 hover:opacity-100"
                  >
                    {show.cur ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              <div>
                <InputField
                  name="newPassword"
                  type={show.nw ? "text" : "password"}
                  placeholder="Enter your new password"
                  leftIcon={<Shield className="h-4 w-4 opacity-60" />}
                  right={
                    <button
                      type="button"
                      onClick={() => setShow((s) => ({ ...s, nw: !s.nw }))}
                      className="p-1 opacity-70 hover:opacity-100"
                    >
                      {show.nw ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
                <StrengthBar value={values.newPassword} />
                <p className="mt-2 text-xs text-white/50">
                  Use 8+ chars with upper/lowercase, numbers & symbols.
                </p>
              </div>

              <InputField
                name="confirmPassword"
                type={show.cf ? "text" : "password"}
                placeholder="Confirm new password"
                leftIcon={<Lock className="h-4 w-4 opacity-60" />}
                right={
                  <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, cf: !s.cf }))}
                    className="p-1 opacity-70 hover:opacity-100"
                  >
                    {show.cf ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-yellow-400 text-black font-semibold py-3 disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

/* --------------------------- Security Setting Page --------------------------- */

export const SecuritySettingPage: React.FC = () => {
  const [finger, setFinger] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("zarvo:fingerprint");
    if (saved) setFinger(saved === "1");
  }, []);

  const persist = (v: boolean) => {
    setFinger(v);
    localStorage.setItem("zarvo:fingerprint", v ? "1" : "0");
  };

  return (
    <Wrapper>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <BackButtonAuto />
        <h1 className="text-lg font-semibold">Security Setting</h1>
      </div>

      <div className="grid gap-2">
        <Tile
          icon={<Lock className="h-5 w-5" />}
          title="Change Password"
          onClick={() => setShowModal(true)}
          right={<ChevronRight />}
        />

        <Tile
          icon={<FingerIcon className="h-5 w-5" />}
          title="Finger Print"
          //   subtitle="Use device biometrics for quick login"
          right={<Toggle checked={finger} onChange={persist} />}
        />
      </div>

      {/* Modal */}
      <ChangePasswordModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </Wrapper>
  );
};

export default SecuritySettingPage;
