import React, { Component } from "react";
import Layout from "../components/MyLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Jumbotron, Button } from "reactstrap";

class Index extends Component {
  render() {
    return (
      <Layout>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Home</h1>
                <p>

                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Layout>
    );
  }
}

export default Index;
