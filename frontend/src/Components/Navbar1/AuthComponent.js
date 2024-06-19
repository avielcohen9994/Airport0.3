import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/v1/auth/signup", {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/auth/logout");
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4"> Authentication </h1>
      <Row className="justify-content-center">
        <Col md={6}>
          {message && <Alert variant="info">{message}</Alert>}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Row>
                  <Col md={3}>
                    <Form.Label>Emai:</Form.Label>
                  </Col>
                  <Col md={9}>
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-2"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Row>
                  <Col md={3}>
                    <Form.Label>Password:</Form.Label>
                  </Col>
                  <Col md={9}>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mb-3"
                    />
                  </Col>
                </Row>
              </Form.Group>
  
              <Button variant="primary" onClick={handleLogin} className="w-100 mb-2">
                Login
              </Button>
              <Button variant="secondary" onClick={handleSignup} className="w-100 mb-2">
                Sign up
              </Button>
              <Button variant="danger" onClick={handleLogout} className="w-100">
                Logout
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthComponent;
