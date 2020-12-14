import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { signin } from "../api/api";

export default function LoginPage() {
  let history = useHistory();

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [status, setStatus] = useState("");

  function loginHandler() {
    signin(email, password, (response) => {
      if (response.token !== null && response.token !== undefined) {
        if (response.role === "admin") {
          dispatch({ type: "SET_COMMISSION", payload: response.token });
          history.entries = [];
          history.index = -1;
          history.push("/commission/home");
        } else {
          dispatch({ type: "SET_STUDENT", payload: response.token });
          history.entries = [];
          history.index = -1;
          history.push("/student/home");
        }
      } else {
        setStatus(response);
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button onClick={() => loginHandler()}>Login</Button>
            {status}
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
