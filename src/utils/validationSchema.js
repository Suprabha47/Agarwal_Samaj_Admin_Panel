// src/utils/validationSchemas.js
import * as Yup from "yup";

export const step1Schema = Yup.object({
  name: Yup.string().required("Name is required"),
  dob: Yup.date().required("Date of Birth is required"),
  birth_place: Yup.string().required("Birth place is required"),
  candidate_gender: Yup.string().required("Gender is required"),
  manglik: Yup.string().required("Manglik field is required"),
  gotra: Yup.string().required("Gotra is required"),
  maternal_gotra: Yup.string().required("Maternal gotra is required"),
});

export const step2Schema = Yup.object({
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
});

export const step3Schema = Yup.object({
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
});

export const step4Schema = Yup.object({
  height: Yup.string().required("Height is required"),
  body_type: Yup.string().required("Body type is required"),
  complexion: Yup.string().required("Complexion is required"),
  blood_group: Yup.string().required("Blood group is required"),
});

export const step5Schema = Yup.object({
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
});

export const step6Schema = Yup.object({
  no_unmarried_brother: Yup.number().min(0),
  no_unmarried_sister: Yup.number().min(0),
  no_married_brother: Yup.number().min(0),
  no_married_sister: Yup.number().min(0),
});

export const step7Schema = Yup.object({
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
});

// step8Schema.js
export const step8Schema = Yup.object({
  kundali_milana: Yup.string(),
  about_me: Yup.string().required("About Me is required"),
  image_path: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false; // required already handles empty, but safe check
      if (typeof value === "string") {
        // handles when backend sends a URL
        return value.startsWith("http") || value.startsWith("data:image");
      }
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return false;
    }),
  subscription: Yup.boolean(),
});

export const STEP_VALIDATION_SCHEMAS = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
];
