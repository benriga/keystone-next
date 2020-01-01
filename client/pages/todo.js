import React, { useState, useEffect } from "react";
import Layout from "../components/MyLayout";
import fetch from "isomorphic-unfetch";

import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Form, Button, Col, Input, Table } from "reactstrap";

export default function Todo() {
  let [{ state, data }, setState] = useState({ state: "loading", data: null });
  let fetch = () => {
    graphql(GET_TODOS)
      .then(({ data }) => {
        setState({ state: "loaded", data });
      })
      .catch(() => {
        setState({ state: "error", data: null });
      });
  };

  useEffect(fetch, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h1>Keystone 5 - Todo Example</h1>
            <p>
              Here's a simple demo app that lets you add/remove todo items.
              Create a few entries, then go check them out in the{" "}
              <a target="_blank" href="/admin">
                Keystone 5 Admin UI
              </a>
              !
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h2>To-Do List</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <EntryForm refetch={fetch} />
          </Col>
        </Row>
        <Row>
          <Col>
            <List data={data} state={state} refetch={fetch} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

const EntryForm = ({ refetch }) => {
  let [value, setValue] = useState("");

  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          graphql(ADD_TODO, { name: value }).then(refetch);
          setValue("");
        }}
      >
        <Input 
          placeholder="Add new item"
          className="addItem"
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
      </Form>
    </div>
  );
};

function List({ data, state, refetch }) {
  switch (state) {
    case "loading": {
      return <p>Loading...</p>;
    }
    case "error": {
      return <p>Error!</p>;
    }
    case "loaded": {
      return (
        <Table striped>
          <tbody>
            {data.allTodos.map((todo, index) => (
              <Item todo={todo} refetch={refetch} key={index} />
            ))}
          </tbody>
        </Table>
      );
    }
  }
}

const Item = props => (
  <tr>
    <td style={styles.buttonWidth}>
      <Button
        close
        className="trash"
        onClick={() => {
          graphql(REMOVE_TODO, { id: props.todo.id }).then(props.refetch);
        }}
      ></Button>
    </td>
    <td>{props.todo.name}</td>
  </tr>
);

function graphql(query, variables = {}) {
  return fetch("/admin/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      variables,
      query
    })
  }).then(x => x.json());
}

const GET_TODOS = `
query GetTodos {
  allTodos {
    name
    id
  }
}
`;

const ADD_TODO = `
mutation AddTodo($name: String!) {
  createTodo(data: { name: $name }) {
    name
    id
  }
}
`;

const REMOVE_TODO = `
mutation RemoveTodo($id: ID!) {
  deleteTodo(id: $id) {
    name
    id
  }
}
`;

const styles = {
  buttonWidth: {
    width: 20
  }
};
