import { useState } from "react";
import { useFormik } from "formik";
import { initialValues } from "./utils/membershipInitialState";
import { ValidationSchema } from "./utils/membershipValidation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../Layout/Layout";

export default function CreateMembership() {
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Form submission logged in development only
      if (process.env.NODE_ENV === 'development') {
        console.log("Submitting values:", values);
      }
      try {
        setSubmitting(true);
        // Form state logged in development only
        if (process.env.NODE_ENV === 'development') {
          console.log("set submitting");
        }
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key === "membershipNumber") return;
          if (values[key] instanceof File) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        });

        // Form data logged in development only
        if (process.env.NODE_ENV === 'development') {
          console.log("set form data");
        }

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/membership`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response?.data) {
          toast.success("Membership Created Successfully");
          resetForm();
        }
      } catch (error) {
        toast.error("Something Went Wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {" "}
      <Layout PageName="Membership" isMemebership={true} />
      <div className="flex flex-col md:ml-64">
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Form</h2>

          <hr></hr>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
          >
            {/* Applicant Name */}
            <InputField
              label="Applicant Name *"
              name="applicantName"
              formik={formik}
            />

            {/* Wife Name */}
            <InputField label="Wife Name" name="wifeName" formik={formik} />

            {/* Applicant DOB */}
            <InputField
              type="date"
              label="Applicant DOB *"
              name="applicantDob"
              formik={formik}
            />

            {/* Marriage Date */}
            <InputField
              type="date"
              label="Marriage Date"
              name="marriageDate"
              formik={formik}
            />

            {/* Wife DOB */}
            <InputField
              type="date"
              label="Wife DOB"
              name="wifeDob"
              formik={formik}
            />

            {/* Father/Husband Name */}
            <InputField
              label="Father / Husband Name"
              name="fatherHusbandName"
              formik={formik}
            />

            {/* Gotra */}
            <InputField label="Gotra *" name="gotra" formik={formik} />

            {/* Residential Address */}
            <TextareaField
              label="Residential Address *"
              name="resAddress"
              formik={formik}
            />

            {/* Village / City */}
            <InputField
              label="Village / City"
              name="villageCity"
              formik={formik}
            />

            {/* District */}
            <InputField label="District" name="district" formik={formik} />

            {/* State */}
            <InputField label="State *" name="state" formik={formik} />

            {/* Pincode */}
            <InputField label="Pincode *" name="pincode" formik={formik} />

            {/* Telephone */}
            <InputField label="Telephone" name="telephone" formik={formik} />

            {/* Mobile (Self) */}
            <InputField
              label="Mobile (Self) *"
              name="mobileSelf"
              formik={formik}
            />

            {/* Mobile (Wife) */}
            <InputField
              label="Mobile (Wife)"
              name="mobileWife"
              formik={formik}
            />

            {/* Fax / Email */}
            <InputField
              label="Email *"
              name="faxEmail"
              formik={formik}
              type="email"
            />

            {/* Occupation */}
            <InputField
              label="Occupation *"
              name="occupation"
              formik={formik}
            />

            {/* Origin */}
            <InputField label="Origin" name="origin" formik={formik} />

            {/* Corpus Fund */}
            <InputField
              type="number"
              label="Corpus Fund"
              name="corpusFund"
              formik={formik}
            />

            {/* Life Magazine Fee */}
            <InputField
              type="number"
              label="Life Magazine Fee"
              name="lifeMagazineFee"
              formik={formik}
            />

            {/* Membership Fee */}
            <InputField
              type="number"
              label="Membership Fee"
              name="membershipFee"
              formik={formik}
            />

            {/* Husband ID Card */}
            <FileField
              label="Husband ID Card *"
              name="husbandIdCard"
              formik={formik}
            />

            {/* Wife ID Card */}
            <FileField label="Wife ID Card" name="wifeIdCard" formik={formik} />

            {/* Husband Photo */}
            <FileField
              label="Husband Photo *"
              name="husbandPhoto"
              formik={formik}
            />

            {/* Wife Photo */}
            <FileField label="Wife Photo" name="wifePhoto" formik={formik} />

            {/* Submit */}
            <div className="col-span-1 md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-1/3 bg-gray-700 text-white py-3 rounded hover:bg-gray-800"
              >
                {submitting ? "Submitting..." : "Create Membership"}
              </button>
            </div>
          </form>
          <Toaster position="top-center" />
        </main>
      </div>
    </>
  );
}

/* Reusable Input Field */
function InputField({ label, name, formik, type = "text" }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border rounded px-3 py-2"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
}

/* Reusable Textarea Field */
function TextareaField({ label, name, formik }) {
  return (
    <div className="md:col-span-2">
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        name={name}
        rows={3}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border rounded px-3 py-2"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
}

/* Reusable File Field */
function FileField({ label, name, formik }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        name={name}
        accept=".jpeg,.jpg,.png,.gif,.webp,.pdf"
        onBlur={formik.handleBlur}
        onChange={(event) =>
          formik.setFieldValue(name, event.currentTarget.files[0])
        }
        className="w-full border rounded px-3 py-2"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
}
