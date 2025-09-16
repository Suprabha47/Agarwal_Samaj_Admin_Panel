// membershipValidation.js
import * as Yup from "yup";

const membershipValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  wifeName: Yup.string(),
  dob: Yup.date().required("Date of Birth is required"),
  dom: Yup.date(),
  dobWife: Yup.date(),
  fatherHusbandName: Yup.string().required("Father/Husband Name is required"),
  gotra: Yup.string().required("Gotra is required"),
  address: Yup.string().required("Address is required"),
  village: Yup.string(),
  district: Yup.string(),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().matches(/^[0-9]{6}$/, "Enter a valid 6 digit Pincode"),
  mobileSelf: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile")
    .required("Mobile is required"),
  mobileWife: Yup.string().matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile"),
  email: Yup.string().email("Invalid email"),
  occupation: Yup.string(),
  origin: Yup.string(),
  proposerName: Yup.string(),
  contactNo: Yup.string(),
  profilePhoto: Yup.mixed().required("Profile Photo is required"),
});

export default membershipValidation;
