import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useAuth } from "../lib/authetication";
import Layout from "../components/MyLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Jumbotron, Button, Alert } from "reactstrap";

import dynamic from "next/dynamic";
const SigninPage = dynamic(() => import("./signin"));

const toastMessages = {
  success: {
    style: "success",
    header: "Success",
    body: "You were logged out"
  },
  error: {
    style: "danger",
    header: "Error",
    body: "Something went wrong"
  }
};

var toast = {
  style: "",
  header: "",
  body: ""
};

export default function Profile() {
  const { user, signout, isAuthenticated } = useAuth();

  const [show, setShow] = useState(false);

  // if the user tries to open this page while still anon
  // then show them to the signin page
  // this mostly works but still shows /signin url 
  // once they ar
  React.useEffect(() => {
    if (isAuthenticated) {
      return; // do nothing if the user is logged in
    }
    Router.replace("/profile", "/signin", { shallow: true });
  }, [isAuthenticated]);

  if (!isAuthenticated) return <SigninPage />;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await signout();
      return;
    } catch (error) {
      // show the Error toast then dismiss it
      toast = toastMessages.error;
      toast.body +=  ": " + error.message;
      setShow(true);
      setTimeout(function() {
        setShow(false);
      }, 3000);
    }
  };

  return (
    <Layout>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>Profile</h1>
              <Alert
                isOpen={show}
                color={toast.style}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <h4 className="alert-heading">{toast.header}</h4>
                <p className="mb-0">{toast.body}</p>
              </Alert>
              <p>
                {isAuthenticated
                  ? "You're logged in as - Name: " + user.name
                  : "Logged out"}
              </p>
              <Button onClick={handleSubmit} color="secondary" size="sm">
                Sign Out
              </Button>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      </Jumbotron>
    </Layout>
  );
}
