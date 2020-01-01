/** @jsx jsx */

import { useEffect } from 'react';
import Router from 'next/router';
import { jsx } from '@emotion/core';

import { useAuth } from '../lib/authetication';
import Layout from "../components/MyLayout";
import { Container, } from "reactstrap";

export default () => {
  const { isAuthenticated, signout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/');
      return;
    }
    signout();
  }, [isAuthenticated]);

  return (
      <Layout>
      <Container>
        <h1>Signing you out...</h1>
      </Container>
      </Layout>
  );
};
