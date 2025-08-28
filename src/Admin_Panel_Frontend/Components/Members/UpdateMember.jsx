import BasicInfo from "./details-form/BasicInfo";
import FamilyInfo from "./details-form/FamilyInfo";
import ContactInfo from "./details-form/ContactInfo";
import PhysicalInfo from "./details-form/PhysicalInfo";
import EduWorkInfo from "./details-form/EduWorkInfo";
import SiblingsInfo from "./details-form/SiblingsInfo";
import RelativeInfo from "./details-form/RelativeInfo";
import MiscellaneousInfo from "./details-form/MiscellaneousInfo";
import Header from "../Header/Header";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { FORMIK_INITIAL_VALUES } from "../../../utils/FORMIK_INITIAL_VALUES";
import { YUP_VALIDATION } from "../../../utils/YUP_VALIDATION";
import { STEP_VALIDATION_SCHEMAS } from "../../../utils/validationSchema";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";

export default function UpdateMember() {
  const [step, setStep] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);
  const [initialValues, setInitialValues] = useState(FORMIK_INITIAL_VALUES);
  const [loading, setLoading] = useState(true);
  const candidateId = useParams();

  // Fetch existing candidate data
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4005/api/candidates/${candidateId}`
        );
        if (response.data) {
          setInitialValues({
            ...FORMIK_INITIAL_VALUES,
            ...response.data, // make sure API keys match Formik fields
          });
        }
      } catch (error) {
        toast.error("Failed to fetch candidate data");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [candidateId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: YUP_VALIDATION,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key !== "image_path") formData.append(key, values[key]);
        });

        if (values.image_path instanceof File) {
          formData.append("image_path", values.image_path);
        }

        const response = await axios.put(
          `http://localhost:4005/api/candidates/${candidateId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data) {
          toast.success(
            response.data.message || "Candidate Updated Successfully"
          );
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong!");
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  // Step validation (step 7 optional)
  useEffect(() => {
    const validateStep = async () => {
      if (step === 7) {
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
      } catch (err) {
        setIsStepValid(false);
      }
    };
    validateStep();
  }, [step, formik.values]);

  const handleNext = async () => {
    if (step === 7) {
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
        <Header setOpenSidebar={setOpenSidebar} />

        <div className="flex justify-center px-4 py-8 mt-3">
          <form
            onSubmit={formik.handleSubmit}
            className="w-[90%] bg-white border border-gray-300 shadow-md rounded-lg p-6 space-y-6"
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
                {step < STEP_VALIDATION_SCHEMAS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid}
                    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid}
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
