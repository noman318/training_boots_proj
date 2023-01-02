/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/MyData";
import { useFormik } from 'formik'
import { addProductSchema } from "../schema/addProductSchema";

const initialValues = {
  countInStock: 0,
  manufacturer: "",
  description: "",
  price:1,
  category:"",
  name:'',
  image:null
};

export default function AddProduct() {
  const navigate = useNavigate();
  const { values, errors, touched,handleBlur, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: addProductSchema,
    onSubmit: (values) => {
      console.log(initialValues);
      console.log(values);
      // console.log(initialValues);
    },
  });
  const [state, setState] = useState({
    errMsg: "",
    succMsg: "",
    imagePath: "",
  });
  const uploadImage = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] });
    }
  };
  const handleSubmit = (event) => {
    console.log("handlesubmit :>> ");
    event.preventDefault();
    if (state.imagePath != "") {
      if (
        state.imagePath.type == "image/jpg" ||
        state.imagePath.type == "image/jpeg" ||
        state.imagePath.type == "image/png"
      ) {
        // when we upload any attachment we can send the data with FormData
        const data = new FormData(event.currentTarget);
        console.log("data :>> ", data);
        const senddata = new FormData();
        console.log("senddata", senddata);
        senddata.append("name", data.get("name"));
        senddata.append("category", data.get("category"));
        senddata.append("price", data.get("price"));
        senddata.append("description", data.get("description"));
        senddata.append("manufacturer", data.get("manufacturer"));
        senddata.append("countInStock", data.get("countInStock"));
        senddata.append("attach", state.imagePath);
        addProduct(senddata).then((res) => {
          if (res?.data.err == 0) {
            console.log("res.data", res.data);

            setState({ ...state, succMsg: res.data.msg });
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
          if (res.data.err == 1) {
            setState({ ...state, errMsg: res.data.msg });
          }
        });
      } else {
        toast.error(
          setState({ ...state, errMsg: "Only support Jpg and Png Image" })
        );
      }
    } else {
      toast.error(setState({ ...state, errMsg: "Please select a image" }));
    }
  };
  return (
    <div className="w-50">
      <h1>AddProduct</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="form_label">Product Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product name"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.name && touched.name?
                <p className='text-danger'>{errors.name}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCat">
          <Form.Label className="form_label">Product category: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product category"
            name="category"
            required
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.category && touched.category?
                <p className='text-danger'>{errors.category}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label className="form_label">Product Price: </Form.Label>
          <Form.Control
            type="number"
            placeholder="Product Price"
            name="price"
            required
            min={1}
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.price && touched.price?
                <p className='text-danger'>{errors.price}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDesc">
          <Form.Label className="form_label">Product Description: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Description"
            name="description"
            required
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.description && touched.description?
                <p className='text-danger'>{errors.description}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicManufac">
          <Form.Label className="form_label">Product Manufacturer: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Manufacturer"
            name="manufacturer"
            required
            value={values.manufacturer}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.manufacturer && touched.manufacturer?
                <p className='text-danger'>{errors.manufacturer}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAvilable">
          <Form.Label className="form_label">
            Product Available Items:{" "}
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Product Available Items"
            name="countInStock"
            required
            value={values.countInStock}
            onChange={handleChange}
            onBlur={handleBlur}
          />
           {errors.countInStock && touched.countInStock?
                <p className='text-danger'>{errors.countInStock}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form_label">Product Image: </Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload Image"
            name="image"
            onChange={uploadImage}
            required
            value={values.image}
          /> {errors.image && touched.image?
            <p className='text-danger'>{errors.image}</p>:''}

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
