import * as Yup from "yup";

export const registrationSchema = Yup.object({
  firstName: Yup.string()
    .min(3)
    .max(15)
    .required("Please Enter your First Name")
    .matches("^[a-zA-Z]*$", "Only Text Allowed"),
    lastName: Yup.string()
    .min(3)
    .max(15)
    .required("Please Enter your Last Name")
    .matches("^[a-zA-Z]*$", "Only Text Allowed"),
    phone: Yup.string().min(10).max(10).matches('[0-9]{10}$','10 Digits Only')
    .required('Enter Phone Number'),
    email: Yup.string().email().required("Please Enter your Email"),
    password: Yup.string()
    .min(3)
    .max(20)
    .required("Please Enter your Password"),
    // .matches(
    //   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$?]).{8,16}$",
    //   "At least 8 - 16 characters, \n must contain at least 1 uppercase letter, \n must contain at least 1 lowercase letter, \n and 1 number \n Can contain any of this special characters $ % # * & -"
    // ),
    con_password: Yup.string()
    .required("Please Enter your Password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
