import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required("Please enter product name"),
  category: Yup.string()
    .min(1)
    .max(30)
    .matches("[a-zA-Z]+", "Only string are allowed")
    .required("Please enter product caegory"),
  price: Yup.string()
    // .positive()
    // .integer()
    .min(1)
    .max(10)
    .matches("[0-9]+", "Only numbers are allowed")
    .required("Please enter price in Number only"),
  description: Yup.string()
    .min(4)
    .max(50)
    .required("Please enter product description"),
  manufacturer: Yup.string()
    .min(3)
    .max(50)
    .required("Please enter product manufaturer"),
  availableItems: Yup.number()
    .positive()
    .integer()
    .required("Please enter price in Number only"),
});
