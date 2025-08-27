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
import { YUP_VALIDATION } from "../../../utils/YUP_VALIDATION"; // full schema for final submit (optional)
import { STEP_VALIDATION_SCHEMAS } from "../../../../src/utils/validationSchema";
import Sidebar from "../Sidebar/Sidebar";

export default function CreateMember() {
   
      const [openSidebar, setOpenSidebar] = useState(false);

        const [step, setStep] = useState(1);

        const formik=useFormik({
        initialValues:{
  name: "",
  dob: "",
  birth_place: "",
  candidate_gender: "",
  manglik: "",
  gotra: "",
  maternal_gotra: "",
  father_name: "",
  father_mobile: "",
  father_occupation: "",
  father_annual_income: "",
  mother_name: "",
  mother_occupation: "",
  grandfather: "",
  native_place: "",
  nationality: "",
  status_of_family: "",
  address: "",
  country: "",
  state: "",
  district: "",
  pin_code: "",
  phone: "",
  contact_no: "",
  email: "",
  height: "",
  body_type: "",
  complexion: "",
  blood_group: "",
  education_detail: "",
  education: "",
  hobby: "",
  occupation: "",
  designation: "",
  annual_income: "",
  company_name: "",
  company_city: "",
  no_unmarried_brother: 0,
  no_unmarried_sister: 0,
  no_married_brother: 0,
  no_married_sister: 0,
  relation: "",
  relative_name: "",
  relative_mobile_no: "",
  relative_city: "",
  relative_company_name: "",
  relative_designation: "",
  relative_company_address: "",
  kundali_milana: "",
  about_me: "",
  image_path: "",
  subscription: false, 

        },
        onSubmit:(values)=>{
            console.log(values);

        },
        validationSchema:Yup.object(
            {
      // -------- Candidate Basic Info --------
      name: Yup.string().required("Name is required"),
      dob: Yup.date().required("Date of Birth is required"),
      birth_place: Yup.string().required("Birth place is required"),
      candidate_gender: Yup.string().required("Gender is required"),
      manglik: Yup.string().required("Manglik field is required"),
      gotra: Yup.string().required("Gotra is required"),
      maternal_gotra: Yup.string().required("Maternal gotra is required"),

      // -------- Family Info --------
      father_name: Yup.string().required("Father's name is required"),
      father_mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
        .required("Father's mobile is required"),
      father_occupation: Yup.string().required("Father occupation is required"),
      father_annual_income: Yup.number()
        .min(0, "Income cannot be negative")
        .required("Father annual income is required"),

      mother_name: Yup.string().required("Mother's name is required"),
      mother_occupation: Yup.string().required("Mother occupation is required"),
      grandfather: Yup.string().required("Grandfather's name is required"),
      native_place: Yup.string().required("Native place is required"),
      nationality: Yup.string().required("Nationality is required"),
      status_of_family: Yup.string().required("Status of family is required"),

      // -------- Contact Info --------
      address: Yup.string().required("Address is required"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      district: Yup.string().required("District is required"),
      pin_code: Yup.string()
        .matches(/^[0-9]{4,10}$/, "Invalid Pin Code")
        .required("Pin Code is required"),
      phone: Yup.string().matches(/^[0-9]{6,15}$/, "Invalid Phone number"),
      contact_no: Yup.string()
        .matches(/^[0-9]{6,15}$/, "Invalid Contact number")
        .required("Contact number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      // -------- Physical Info --------
      height: Yup.string().required("Height is required"),
      body_type: Yup.string().required("Body type is required"),
      complexion: Yup.string().required("Complexion is required"),
      blood_group: Yup.string().required("Blood group is required"),

      // -------- Education & Work --------
      education_detail: Yup.string().required("Education detail is required"),
      education: Yup.string().required("Education is required"),
      hobby: Yup.string().required("Hobby is required"),
      occupation: Yup.string().required("Occupation is required"),
      designation: Yup.string().required("Designation is required"),
      annual_income: Yup.number()
        .min(0, "Income cannot be negative")
        .required("Annual income is required"),
      company_name: Yup.string().required("Company name is required"),
      company_city: Yup.string().required("Company city is required"),

      // -------- Siblings Info --------
      no_unmarried_brother: Yup.number().min(0),
      no_unmarried_sister: Yup.number().min(0),
      no_married_brother: Yup.number().min(0),
      no_married_sister: Yup.number().min(0),

      // -------- Relatives Info (Optional fields) --------
      relation: Yup.string(),
      relative_name: Yup.string(),
      relative_mobile_no: Yup.string().matches(
        /^[0-9]{10}$/,
        "Enter a valid 10-digit number"
      ),
      relative_city: Yup.string(),
      relative_company_name: Yup.string(),
      relative_designation: Yup.string(),
      relative_company_address: Yup.string(),

     
      kundali_milana: Yup.string(),
      about_me: Yup.string().required("About Me is required"),
      image_path:  Yup.mixed()
  .required("Image is required")
  .test("fileType", "Only image files are allowed", (value) => {
    return value && value.type.startsWith("image/");
  }),
      subscription: Yup.boolean(),
    }
        )
        });

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
          {/* Close button */}
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
        {/* Top Navbar - Fixed */}
        <Header setOpenSidebar={setOpenSidebar} />

        <div className="flex justify-center px-4 py-8 mt-3">
          <form
            onSubmit={formik.handleSubmit}
            className="w-[90%] bg-white border border-gray-300 shadow-md rounded-lg p-6 space-y-6"
          >
            {/* Render the current step */}
            {renderStep()}

            {/* Navigation Buttons */}
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
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
