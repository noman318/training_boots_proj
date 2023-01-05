import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { registrationSchema } from "../schema/registrationSchema";
import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from 'formik'
import { useNavigate, Link, useLocation } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Helmet } from "react-helmet-async";

export default function RegistrationScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  // eslint-disable-next-line no-unused-vars
  // const { errors, touched,handleBlur } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: registrationSchema,
  //   onSubmit: (values) => {
  //     console.log(initialValues);
  //     console.log(values);
  //   },
  // });

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(firstName, lastName, phone, email, password));
    }
  };
  return (
    <FormContainer>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicFname">
          <Form.Label className="form_label">Firts Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="first name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLname">
          <Form.Label className="form_label">Last Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form_label">E-mail: </Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label className="form_label">phone: </Form.Label>
          <Form.Control
            type="text"
            placeholder="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPass">
          <Form.Label className="form_label">password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConPass">
          <Form.Label className="form_label">Confrim password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
