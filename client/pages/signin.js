/** @jsx jsx */

import { useEffect } from "react";
import Router from "next/router";
import { jsx } from "@emotion/core";

import Signin from "../components/auth/signin";
import { useAuth } from "../lib/authetication";

import Layout from "../components/MyLayout";
import { Container, } from "reactstrap";

export default () => {
  const { isAuthenticated } = useAuth();

  // if the user is logged in, redirect to the homepage
  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <Container>
          <h1>Sign in</h1>
          <Signin />
      </Container>
    </Layout>
  );
};
