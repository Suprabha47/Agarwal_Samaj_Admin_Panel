import Header from "../Header/Header";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { FORMIK_INITIAL_VALUES } from "../../../utils/FORMIK_INITIAL_VALUES";
import { STEP_VALIDATION_SCHEMAS } from "../../../utils/validationSchema";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import BasicInfo from "./details-form/BasicInfo";
import FamilyInfo from "./details-form/FamilyInfo";
import ContactInfo from "./details-form/ContactInfo";
import PhysicalInfo from "./details-form/PhysicalInfo";
import EduWorkInfo from "./details-form/EduWorkInfo";
import SiblingsInfo from "./details-form/SiblingsInfo";
import RelativeInfo from "./details-form/RelativeInfo";
import MiscellaneousInfo from "./details-form/MiscellaneousInfo";
import { update_YUP_VALIDATION } from "../../../utils/update_YUP_VALIDATION";

export default function UpdateMember() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);
  const [initialValues, setInitialValues] = useState(FORMIK_INITIAL_VALUES);
  const [loading, setLoading] = useState(true);

  const totalSteps = 8;

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4005/api/candidates/${id}`
        );
        console.log("res data: ", response.data);
        if (response.data) {
          setInitialValues({
            ...FORMIK_INITIAL_VALUES,
            ...response.data,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch candidate data");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: update_YUP_VALIDATION,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key !== "image_path") formData.append(key, values[key]);
        });

        // ✅ Only append if user uploaded new image
        if (values.image_path instanceof File) {
          formData.append("image_path", values.image_path);
        }

        const response = await axios.put(
          `http://localhost:4005/api/candidates/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data) {
          toast.success(
            response.data.message || "Candidate Updated Successfully"
          );
          setTimeout(() => {
            window.location.href = "/members";
          }, 500);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error(error.response?.data?.error || "Update failed");
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  useEffect(() => {
    const validateStep = async () => {
      if (step > STEP_VALIDATION_SCHEMAS.length) {
        setIsStepValid(true);
        return;
      }

      const currentSchema = STEP_VALIDATION_SCHEMAS[step - 1];
      if (!currentSchema) {
        setIsStepValid(true);
        return;
      }
      try {
        await currentSchema.validate(formik.values, { abortEarly: false });
        setIsStepValid(true);
      } catch {
        setIsStepValid(false);
      }
    };
    validateStep();
  }, [step, formik.values]);

  const handleNext = async () => {
    if (step === STEP_VALIDATION_SCHEMAS.length) {
      setStep((s) => s + 1);
      return;
    }

    const currentSchema = STEP_VALIDATION_SCHEMAS[step - 1];
    if (!currentSchema) {
      setStep((s) => s + 1);
      return;
    }

    try {
      await currentSchema.validate(formik.values, { abortEarly: false });
      setStep((s) => s + 1);
    } catch (err) {
      const errors = {};
      if (err && err.inner) {
        err.inner.forEach((e) => {
          if (e.path && !errors[e.path]) errors[e.path] = e.message;
          formik.setFieldTouched(e.path, true, false);
        });
      }
      formik.setErrors((prev) => ({ ...prev, ...errors }));
    }
  };

  const handlePrevious = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo formik={formik} />;
      case 2:
        return <FamilyInfo formik={formik} />;
      case 3:
        return <ContactInfo formik={formik} />;
      case 4:
        return <PhysicalInfo formik={formik} />;
      case 5:
        return <EduWorkInfo formik={formik} />;
      case 6:
        return <SiblingsInfo formik={formik} />;
      case 7:
        return <RelativeInfo formik={formik} />;
      case 8:
        return <MiscellaneousInfo formik={formik} />;
      default:
        return null;
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed inset-0 z-40 transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="h-full w-64 bg-white shadow-lg relative">
          <button
            onClick={() => setOpenSidebar(false)}
            className="absolute top-4 right-4 text-gray-700"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-64">
        <Header setOpenSidebar={setOpenSidebar} isUpdateform={true} />

        <div className="flex justify-center px-4 py-8 mt-3">
          <form
            className="w-[90%] bg-white border border-gray-300 shadow-md rounded-lg p-6 space-y-6"
            onSubmit={formik.handleSubmit}
          >
            {renderStep()}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Previous
                </button>
              )}

              <div className="flex gap-2">
                {step === 7 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Skip
                  </button>
                )}

                {step < totalSteps && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid}
                    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Next
                  </button>
                )}

                {step === totalSteps && (
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
