import * as Yup from "yup";

const FILE_SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];

export const ValidationSchema = Yup.object().shape({
  applicantName: Yup.string().required("Applicant Name is required"),
  wifeName: Yup.string(),
  applicantDob: Yup.date()
    .required("Applicant Date of Birth is required")
    .typeError("Invalid date"),
  marriageDate: Yup.date().typeError("Invalid date"),
  wifeDob: Yup.date().typeError("Invalid date"),
  fatherHusbandName: Yup.string(),
  gotra: Yup.string().required("Gotra is required"),
  resAddress: Yup.string().required("Residential Address is required"),
  villageCity: Yup.string(),
  district: Yup.string(),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  telephone: Yup.string(),
  mobileSelf: Yup.string()
    .required("Mobile (Self) is required")
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  mobileWife: Yup.string().matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  faxEmail: Yup.string().required("Email is required").email("Invalid email"),
  occupation: Yup.string().required("Occupation is required"),
  origin: Yup.string(),
  corpusFund: Yup.number().typeError("Must be a number"),
  lifeMagazineFee: Yup.number().typeError("Must be a number"),
  membershipFee: Yup.number().typeError("Must be a number"),

  husbandIdCard: Yup.mixed()
    .nullable()
    .required("Husband ID Card is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) =>
        !value || (value && FILE_SUPPORTED_FORMATS.includes(value.type))
    ),

  wifeIdCard: Yup.mixed()
    .nullable()
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) =>
        !value || (value && FILE_SUPPORTED_FORMATS.includes(value.type))
    ),

  husbandPhoto: Yup.mixed()
    .nullable()
    .required("Husband Photo is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) =>
        !value || (value && FILE_SUPPORTED_FORMATS.includes(value.type))
    ),

  wifePhoto: Yup.mixed()
    .nullable()
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) =>
        !value || (value && FILE_SUPPORTED_FORMATS.includes(value.type))
    ),
});
