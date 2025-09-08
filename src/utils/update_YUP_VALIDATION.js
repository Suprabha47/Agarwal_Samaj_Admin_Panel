import * as Yup from "yup";

export const update_YUP_VALIDATION = Yup.object({
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
  
  kundali_milana: Yup.string(),
  about_me: Yup.string().required("About Me is required"),
  subscription: Yup.boolean(),
});
