/** @jsx jsx */

import { useState } from "react";
import { jsx } from "@emotion/core";

import { useAuth } from "../../lib/authetication";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Link from "next/link";

const onChange = handler => e => handler(e.target.value);

export default ({ onSuccess, onClickForgot }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const { isAuthenticated, signin } = useAuth();

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await signin({ username, password });
      setIsLoading(false);
      setErrorState(false);
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      setErrorState(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Alert isOpen={errorState} color="warning">
        Please check your username and password then try again.
      </Alert>

      <Form noValidate onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">username</Label>
          <Input
            autoFocus
            disabled={isLoading || isAuthenticated}
            onChange={onChange(setUsername)}
            placeholder="enter your username"
            required
            type="text"
            value={username}
            id="username"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">password</Label>
          <Input
            autoComplete="password"
            disabled={isLoading || isAuthenticated}
            id="password"
            minLength="8"
            onChange={onChange(setPassword)}
            placeholder="enter your password"
            required
            type="password"
            value={password}
          />
        </FormGroup>

        <FormGroup>
          {isLoading ? (
            <Button disabled>Signing in...</Button>
          ) : (
            <Button type="submit">Sign in</Button>
          )}
          {/* <Link href="/forgot-password" onClick={onClickForgot}>
            <a className="nav-link">Forgot password</a>
          </Link> */}
        </FormGroup>
      </Form>
    </>
  );
};
