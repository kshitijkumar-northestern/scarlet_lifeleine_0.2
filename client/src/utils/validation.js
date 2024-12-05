import * as yup from "yup";

export const phoneRegExp = /^[0-9]{10}$/;

export const donorValidationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  bloodGroup: yup.string().required("Blood group is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number must be 10 digits"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),
});

export const bloodBankValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(phoneRegExp, "Contact number must be 10 digits"),
});
