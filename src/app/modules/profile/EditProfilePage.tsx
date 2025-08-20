import { useState } from "react";
import { Camera, Save, X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Wrapper from "../../../components/Wrapper";
import Avatar from "./componets/Avatar";
import PhotoPickerModal from "./componets/PhotoPickerModal";
import BackButtonAuto from "../../../components/BackButton";

/* ---------- Validation ---------- */
const Schema = Yup.object({
  invitationCode: Yup.string().required(),
  name: Yup.string()
    .trim()
    .min(2, "Too short")
    .max(40, "Max 40 chars")
    .required("Required"),
  bio: Yup.string().trim().max(200, "Max 200 chars"),
  avatar: Yup.string().url().required(), // we store a blob URL or https URL
});

/* ---------- Component ---------- */
export default function EditProfilePage() {
  const [openPicker, setOpenPicker] = useState(false);

  const initialValues = {
    invitationCode: "lihat##dd",
    name: "Salman khan",
    bio: "Bio details",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <Wrapper>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <BackButtonAuto />
        <div className="text-base font-semibold text-white">Edit Profile</div>
        {/* right side empty to keep spacing equal to Save button below */}
        <div className="w-6" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // TODO: integrate with your API
            // await api.updateProfile(values)
            alert("Saved:\n" + JSON.stringify(values, null, 2));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <>
            {/* Avatar */}
            <div className="mt-4 flex justify-center">
              <div className="relative">
                <Avatar size={96} src={values.avatar} />
                <button
                  type="button"
                  onClick={() => setOpenPicker(true)}
                  className="absolute -right-2 bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1C1F24] ring-1 ring-white/10"
                  aria-label="change photo"
                >
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Modal for photo pick */}
            <PhotoPickerModal
              open={openPicker}
              setOpen={setOpenPicker}
              onPick={(file) => {
                const url = URL.createObjectURL(file);
                setFieldValue("avatar", url);
              }}
            />

            {/* Form */}
            <Form className="mt-6 space-y-4">
              {/* Invitation Code (read only) */}
              <div>
                <label className="mb-1 block text-sm text-white/70">
                  Invitation Code
                </label>
                <Field
                  name="invitationCode"
                  readOnly
                  className="w-full rounded-xl border border-white/10 bg-[#0F1014] px-3 py-2.5 text-sm text-white/90 outline-none"
                />
              </div>

              {/* Name */}
              <div>
                <label className="mb-1 block text-sm text-white/70">Name</label>
                <Field
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-[#0F1014] px-3 py-2.5 text-sm text-white/90 outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-xs text-red-400"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="mb-1 block text-sm text-white/70">Bio</label>
                <Field
                  as="textarea"
                  rows={3}
                  name="bio"
                  placeholder="Bio details"
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0F1014] px-3 py-2.5 text-sm text-white/90 outline-none"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="mt-1 text-xs text-red-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#F5C242] px-4 py-2 font-medium text-black hover:brightness-95 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save changes"}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </Wrapper>
  );
}
