import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { postRegister } from "../services/MyData";
import { toast } from "react-toastify";
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "../schema/registrationSchema";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password:"",
  phone:"",
  con_password:'',
};

export default function Registration() {
  const navigate = useNavigate();
  const { values, errors, touched,handleBlur, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      console.log(initialValues);
      console.log(values);
      // console.log(initialValues);
    },
  });
  const [state, setState] = useState({ errMsg: "", succMsg: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
    };
    console.log(formData);
    postRegister(formData)
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line eqeqeq
        if (res.status == 200) {
          setState({ ...state, succMsg: res.data.msg });
          toast.success('Registered Successfully');
          navigate('/login')
        }
        // eslint-disable-next-line eqeqeq
        if (res.status == 404) {
          setState({ ...state, errMsg: res.data.msg });
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-50">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFname">
          <Form.Label className="form_label">Firts Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="first name"
            name="firstName"
            required
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
                    {errors.firstName && touched.firstName?
                <p className='text-danger'>{errors.firstName}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLname">
          <Form.Label className="form_label">Last Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="lastName"
            name="lastName"
            required
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
                    {errors.lastName && touched.lastName?
                <p className='text-danger'>{errors.lastName}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form_label">E-mail: </Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
                    {errors.email && touched.lname?
                <p className='text-danger'>{errors.lname}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label className="form_label">phone: </Form.Label>
          <Form.Control
            type="text"
            placeholder="phone"
            name="phone"
            required
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
                    {errors.phone && touched.phone?
                <p className='text-danger'>{errors.phone}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPass">
          <Form.Label className="form_label">password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
                    {errors.password && touched.password?
                <p className='text-danger'>{errors.password}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConPass">
          <Form.Label className="form_label">Confrim password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="con_password"
            required
            value={values.con_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
                    {errors.con_password && touched.con_password?
                <p className='text-danger'>{errors.con_password}</p>:''}
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
