import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { postRegister } from "../services/MyData";
import { toast } from "react-toastify";

export default function Registration() {
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
        if (res.data.err == 0) {
          setState({ ...state, succMsg: res.data.msg });
          toast.success(state.succMsg);
        }
        // eslint-disable-next-line eqeqeq
        if (res.data.err == 1) {
          setState({ ...state, errMsg: res.data.msg });
          toast.error(state.errMsg);
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
          <Form.Label className="form_label">Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="first name"
            name="firstName"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLname">
          <Form.Label className="form_label">lastName: </Form.Label>
          <Form.Control
            type="text"
            placeholder="lastName"
            name="lastName"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form_label">email: </Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label className="form_label">phone: </Form.Label>
          <Form.Control
            type="number"
            placeholder="phone"
            name="phone"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPass">
          <Form.Label className="form_label">password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
