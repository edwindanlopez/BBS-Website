import * as Yup from "yup";
import { phoneRegExp, characterLimit } from "./FormFieldComponents";

const ImageSupportedFormats = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];
const supportedVideoFormats = [
  "video/quicktime",
  "video/mp4",
  "video/x-m4v",
  "video/mov",
];

const ImageMaxFileSize = 7000000;
const maxVideoFileSize = 40000000;

const contactPageValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  contactMethod: Yup.string().required("Required"),
  subject: Yup.string()
    // specify the set of valid values for job type
    // @see http://bit.ly/yup-mixed-oneOf
    .oneOf(
      ["General Contact", "Estimate", "Question Other"],
      "Invalid Job Type"
    )
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required"),
  email: Yup.string().email("Invalid email addresss").required("Required"),
  message: Yup.string()
    .max(characterLimit, `Must be ${characterLimit} characters or less`)
    .required("Required"),
  city: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  file: Yup.mixed()
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) =>
        value === null || (value && ImageSupportedFormats.includes(value.type))
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value === null || (value && value.size <= ImageMaxFileSize)
    ),
});

const multipleAttachmentFormSchema = Yup.object({
  fullName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email addresss").required("Required"),
  file: Yup.mixed()
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) =>
        value === null || (value && ImageSupportedFormats.includes(value.type))
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value === null || (value && value.size <= maxVideoFileSize)
    ),
  message: Yup.string()
    .max(characterLimit, `Must be ${characterLimit} characters or less`)
    .required("Required"),
});

export { contactPageValidationSchema, multipleAttachmentFormSchema };
