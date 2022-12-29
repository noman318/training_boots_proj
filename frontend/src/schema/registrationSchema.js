import * as Yup from "yup";

export const registrationSchema = Yup.object({
  fname: Yup.string()
    .min(3)
    .max(15)
    .required("Please Enter your First Name")
    .matches("^[a-zA-Z]*$", "Only Text Allowed"),
  lname: Yup.string()
    .min(3)
    .max(15)
    .required("Please Enter your Last Name")
    .matches("^[a-zA-Z]*$", "Only Text Allowed"),
  uname: Yup.string()
    .min(8)
    .max(20)
    .required("Please Enter Username")
    .matches(
      "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
      "Username Should be at least 8 character"
    ),
  email: Yup.string().email().required("Please Enter your Email"),
  pass: Yup.string()
    .min(3)
    .max(20)
    .required("Please Enter your Password")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$?]).{8,16}$",
      "At least 8 - 16 characters, \n must contain at least 1 uppercase letter, \n must contain at least 1 lowercase letter, \n and 1 number \n Can contain any of this special characters $ % # * & -"
    ),
  cpass: Yup.string()
    .required("Please Enter your Password")
    .oneOf([Yup.ref("pass"), null], "Password must match"),
});
