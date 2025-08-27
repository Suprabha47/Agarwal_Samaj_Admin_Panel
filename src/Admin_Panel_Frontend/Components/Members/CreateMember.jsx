import React, {  useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import * as Yup from 'yup';
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from 'formik';
import Header from '../Header/Header';


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
        return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Member Basic Information
  </h1>

  <div className="space-y-5">
    {/* Name */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Name
      </label>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
      />
      {formik.errors.name && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
      )}
    </div>

    {/* Date of Birth */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Date of Birth
      </label>
      <input
        type="date"
        name="dob"
        value={formik.values.dob}
        onChange={formik.handleChange}
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
      />
      {formik.errors.dob && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.dob}</p>
      )}
    </div>

    {/* Birth Place */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Birth Place
      </label>
      <input
        type="text"
        name="birth_place"
        value={formik.values.birth_place}
        onChange={formik.handleChange}
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
      />
      {formik.errors.birth_place && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.birth_place}</p>
      )}
    </div>

    {/* Gender */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Gender
      </label>
      <select
        name="candidate_gender"
        value={formik.values.candidate_gender}
        onChange={formik.handleChange}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {formik.errors.candidate_gender && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.candidate_gender}
        </p>
      )}
    </div>

    {/* Manglik */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Manglik
      </label>
      <select
        name="manglik"
        value={formik.values.manglik}
        onChange={formik.handleChange}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {formik.errors.manglik && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.manglik}</p>
      )}
    </div>

    {/* Gotra */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Gotra
      </label>
      <input
        type="text"
        name="gotra"
        value={formik.values.gotra}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.gotra && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.gotra}</p>
      )}
    </div>

    {/* Maternal Gotra */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Maternal Gotra
      </label>
      <input
        type="text"
        name="maternal_gotra"
        value={formik.values.maternal_gotra}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.maternal_gotra && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.maternal_gotra}
        </p>
      )}
    </div>
  </div>
</div>

        );

      case 2:
        return (
         <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Family Information
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Father Name */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Father Name
      </label>
      <input
        type="text"
        name="father_name"
        value={formik.values.father_name}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.father_name && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.father_name}</p>
      )}
    </div>

    {/* Father Mobile */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Father Mobile
      </label>
      <input
        type="text"
        name="father_mobile"
        value={formik.values.father_mobile}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.father_mobile && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.father_mobile}
        </p>
      )}
    </div>

    {/* Father Occupation */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Father Occupation
      </label>
      <input
        type="text"
        name="father_occupation"
        value={formik.values.father_occupation}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.father_occupation && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.father_occupation}
        </p>
      )}
    </div>

    {/* Father Annual Income */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Father Annual Income
      </label>
      <input
        type="number"
        name="father_annual_income"
        value={formik.values.father_annual_income}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.father_annual_income && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.father_annual_income}
        </p>
      )}
    </div>

    {/* Mother Name */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Mother Name
      </label>
      <input
        type="text"
        name="mother_name"
        value={formik.values.mother_name}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.mother_name && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.mother_name}</p>
      )}
    </div>

    {/* Mother Occupation */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Mother Occupation
      </label>
      <input
        type="text"
        name="mother_occupation"
        value={formik.values.mother_occupation}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.mother_occupation && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.mother_occupation}
        </p>
      )}
    </div>

    {/* Grandfather */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Grandfather
      </label>
      <input
        type="text"
        name="grandfather"
        value={formik.values.grandfather}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.grandfather && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.grandfather}</p>
      )}
    </div>

    {/* Native Place */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Native Place
      </label>
      <input
        type="text"
        name="native_place"
        value={formik.values.native_place}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.native_place && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.native_place}
        </p>
      )}
    </div>

    {/* Nationality */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Nationality
      </label>
      <input
        type="text"
        name="nationality"
        value={formik.values.nationality}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.nationality && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.nationality}
        </p>
      )}
    </div>

    {/* Status of Family */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Status of Family
      </label>
      <input
        type="text"
        name="status_of_family"
        value={formik.values.status_of_family}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.status_of_family && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.status_of_family}
        </p>
      )}
    </div>
  </div>
</div>

        );

      case 3:
        return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Contact Information
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Address */}
    <div className="sm:col-span-2">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Address
      </label>
      <input
        type="text"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.address && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
      )}
    </div>

    {/* Country */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Country
      </label>
      <input
        type="text"
        name="country"
        value={formik.values.country}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.country && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
      )}
    </div>

    {/* State */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        State
      </label>
      <input
        type="text"
        name="state"
        value={formik.values.state}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.state && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
      )}
    </div>

    {/* District */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        District
      </label>
      <input
        type="text"
        name="district"
        value={formik.values.district}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.district && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.district}</p>
      )}
    </div>

    {/* Pin Code */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Pin Code
      </label>
      <input
        type="text"
        name="pin_code"
        value={formik.values.pin_code}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.pin_code && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.pin_code}</p>
      )}
    </div>

    {/* Phone */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Phone
      </label>
      <input
        type="text"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.phone && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
      )}
    </div>

    {/* Contact No */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Contact No
      </label>
      <input
        type="text"
        name="contact_no"
        value={formik.values.contact_no}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.contact_no && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.contact_no}
        </p>
      )}
    </div>

    {/* Email */}
    <div className="sm:col-span-2">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.email && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
      )}
    </div>
  </div>
</div>

        );

      case 4:
        return <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Physical Information
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Height */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Height
      </label>
      <input
        type="text"
        name="height"
        value={formik.values.height}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.height && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.height}</p>
      )}
    </div>

    {/* Body Type */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Body Type
      </label>
      <input
        type="text"
        name="body_type"
        value={formik.values.body_type}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.body_type && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.body_type}</p>
      )}
    </div>

    {/* Complexion */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Complexion
      </label>
      <input
        type="text"
        name="complexion"
        value={formik.values.complexion}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.complexion && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.complexion}</p>
      )}
    </div>

    {/* Blood Group */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Blood Group
      </label>
      <input
        type="text"
        name="blood_group"
        value={formik.values.blood_group}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.blood_group && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.blood_group}</p>
      )}
    </div>
  </div>
</div>;


      case 5:
        return <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Education and Work
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Education Detail */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Education Detail
      </label>
      <input
        type="text"
        name="education_detail"
        value={formik.values.education_detail}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.education_detail && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.education_detail}</p>
      )}
    </div>

    {/* Education */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Education
      </label>
      <input
        type="text"
        name="education"
        value={formik.values.education}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.education && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.education}</p>
      )}
    </div>

    {/* Hobby */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Hobby
      </label>
      <input
        type="text"
        name="hobby"
        value={formik.values.hobby}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.hobby && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.hobby}</p>
      )}
    </div>

    {/* Occupation */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Occupation
      </label>
      <input
        type="text"
        name="occupation"
        value={formik.values.occupation}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.occupation && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.occupation}</p>
      )}
    </div>

    {/* Designation */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Designation
      </label>
      <input
        type="text"
        name="designation"
        value={formik.values.designation}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.designation && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.designation}</p>
      )}
    </div>

    {/* Annual Income */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Annual Income
      </label>
      <input
        type="number"
        name="annual_income"
        value={formik.values.annual_income}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.annual_income && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.annual_income}</p>
      )}
    </div>

    {/* Company Name */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Company Name
      </label>
      <input
        type="text"
        name="company_name"
        value={formik.values.company_name}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.company_name && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.company_name}</p>
      )}
    </div>

    {/* Company City */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Company City
      </label>
      <input
        type="text"
        name="company_city"
        value={formik.values.company_city}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.company_city && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.company_city}</p>
      )}
    </div>
  </div>
</div>
;

      case 6:
        return <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Siblings Information
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Unmarried Brothers */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        No. of Unmarried Brothers
      </label>
      <input
        type="number"
        name="no_unmarried_brother"
        value={formik.values.no_unmarried_brother}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.no_unmarried_brother && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.no_unmarried_brother}</p>
      )}
    </div>

    {/* Unmarried Sisters */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        No. of Unmarried Sisters
      </label>
      <input
        type="number"
        name="no_unmarried_sister"
        value={formik.values.no_unmarried_sister}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.no_unmarried_sister && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.no_unmarried_sister}</p>
      )}
    </div>

    {/* Married Brothers */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        No. of Married Brothers
      </label>
      <input
        type="number"
        name="no_married_brother"
        value={formik.values.no_married_brother}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.no_married_brother && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.no_married_brother}</p>
      )}
    </div>

    {/* Married Sisters */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        No. of Married Sisters
      </label>
      <input
        type="number"
        name="no_married_sister"
        value={formik.values.no_married_sister}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.no_married_sister && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.no_married_sister}</p>
      )}
    </div>
  </div>
</div>
;

      case 7:
        return <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Relative Information
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Relation */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">Relation</label>
      <input
        type="text"
        name="relation"
        value={formik.values.relation}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relation && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.relation}</p>
      )}
    </div>

    {/* Relative Name */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">Relative Name</label>
      <input
        type="text"
        name="relative_name"
        value={formik.values.relative_name}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relative_name && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.relative_name}</p>
      )}
    </div>

    {/* Relative Mobile */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">Relative Mobile</label>
      <input
        type="text"
        name="relative_mobile_no"
        value={formik.values.relative_mobile_no}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relative_mobile_no && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.relative_mobile_no}</p>
      )}
    </div>

    {/* Relative City */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">Relative City</label>
      <input
        type="text"
        name="relative_city"
        value={formik.values.relative_city}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relative_city && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.relative_city}</p>
      )}
    </div>

    {/* Relative Company Name */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">Relative Company Name</label>
      <input
        type="text"
        name="relative_company_name"
        value={formik.values.relative_company_name}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relative_company_name && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.relative_company_name}</p>
      )}
    </div>

    {/* Relative Designation */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">Relative Designation</label>
      <input
        type="text"
        name="relative_designation"
        value={formik.values.relative_designation}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relative_designation && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.relative_designation}</p>
      )}
    </div>

    {/* Relative Company Address */}
    <div className="sm:col-span-2">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Relative Company Address
      </label>
      <input
        type="text"
        name="relative_company_address"
        value={formik.values.relative_company_address}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.relative_company_address && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.relative_company_address}
        </p>
      )}
    </div>
  </div>
</div>
;
      case 8:
        return <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Miscellaneous
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Kundali Milana */}
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Kundali Milana
      </label>
      <input
        type="text"
        name="kundali_milana"
        value={formik.values.kundali_milana}
        onChange={formik.handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      {formik.errors.kundali_milana && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.kundali_milana}
        </p>
      )}
    </div>

    {/* About Me */}
    <div className="sm:col-span-2">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        About Me
      </label>
      <textarea
        name="about_me"
        value={formik.values.about_me}
        onChange={formik.handleChange}
        rows="5"
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
      ></textarea>
      {formik.errors.about_me && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.about_me}</p>
      )}
    </div>

    {/* Image Upload */}
    <div className="sm:col-span-2">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Profile Image
      </label>
      <input
        type="file"
        name="image_path"
        accept="image/*"
        onChange={(event) => {
          const file = event.currentTarget.files[0];
          formik.setFieldValue("image_path", file);
        }}
        className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none 
                   file:mr-4 file:py-2 file:px-4 file:rounded-md 
                   file:border-0 file:bg-indigo-50 file:text-indigo-700 
                   hover:file:bg-indigo-100 cursor-pointer"
      />
      {formik.errors.image_path && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.image_path}</p>
      )}
    </div>

    {/* Subscription */}
    <div className="flex items-center sm:col-span-2">
      <input
        type="checkbox"
        name="subscription"
        checked={formik.values.subscription}
        onChange={formik.handleChange}
        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-gray-500"
      />
      <label
        htmlFor="subscription"
        className="ml-3 text-lg text-gray-700 cursor-pointer"
      >
        Subscribe to updates
      </label>
    </div>
  </div>
</div>
;
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
        <Header  setOpenSidebar={setOpenSidebar} />


     <div className="flex justify-center px-4 py-8 mt-3">
  <form
    onSubmit={formik.handleSubmit}
    className="w-[90%]  bg-white border border-gray-300 shadow-md rounded-lg p-6 space-y-6"
  >
   {
    renderStep()
   }

   
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded"
            >
            Previous
            </button>
          )}

          {step < 8 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Submit
            </button>
          )}
        </div>
            </form>
        </div>
        </main>
      
    </div>
  )
}
