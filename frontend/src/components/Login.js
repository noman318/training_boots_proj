/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { isAdmin, isLoggedIn, postLogin } from "../services/MyData";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(formData);
    postLogin(formData)
      .then((res) => {
        if (res.data.err === 0) {
          console.log(res.data);
          localStorage.setItem("_token", res.data.token);
          isLoggedIn();
          isAdmin();
          toast.success("Logged in Successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        if (res.data.err === 1) {
          setErrMsg(res.data.msg);
          console.log("res.data.msg", res.data.msg);
          toast.error(res.data.msg);
          setTimeout(() => {
            // navigate("/registration");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 justify-content-center align-items-center">
      <Container>
        <Form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}
