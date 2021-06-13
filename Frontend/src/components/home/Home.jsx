/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
import React, { Redirect, Component } from "react";
import { Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import axios from "axios";
import numeral from "numeral";
import apiHost from "../../apiHost";
import "../../App.css";
import ActiveMap from "./ActiveMap";
import PredictMap from "./PredictMap"
import Select from "./Select";

import NavBar from "../landing/NavBar";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // let redirectVar = null;
    if (!localStorage.getItem("idToken")) {
      <Redirect to="/" />;
    }
    return (
      <div>
        <NavBar />
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
            <Row>
              <h2>Dashboard</h2>
              <Select />
              <Row>
              <p style={{fontSize:"2em", marginLeft:"60%"}}>DEMO CARDS</p>
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <Col md={5}>
                    <Card>
                      <Card.Header>SAFE</Card.Header>
                      <Card.Body>
                        <Card.Title>SAFE COUNTRIES</Card.Title>
                        <Card.Text>
                          This countries are safe to travel and here Active
                          cases are low.
                        </Card.Text>
                        <Button variant="success">SAFE TO VISIT</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={5}>
                    <Card>
                      <Card.Header>MODERATE</Card.Header>
                      <Card.Body>
                        <Card.Title>MODERATE COUNTRIES</Card.Title>
                        <Card.Text>
                          This countries are moderate to travel as here the new
                          cases are emerging as same as recovered cases.
                        </Card.Text>
                        <Button variant="warning">
                          CHECK LOCKDOWN CONDITIONS
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={5}>
                    <Card>
                      <Card.Header>UNSAFE</Card.Header>
                      <Card.Body>
                        <Card.Title>UNSAFE COUNTRIES</Card.Title>
                        <Card.Text>
                          This countries are not safe to travel as the new cases
                          are rising and active cases are high.
                        </Card.Text>
                        <Button variant="danger">UNSAFE TO VISIT</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={5}>
                    <Card>
                      <Card.Header>NO DATA</Card.Header>
                      <Card.Body>
                        <Card.Title>NO DATA COUNTRIES</Card.Title>
                        <Card.Text>
                        Unfornately, no data was available for this country.
                        </Card.Text>
                        <Button variant="light">NO DATA !</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </Row>
              <br/>
              <br/>
              <Row>
              <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
              <Col md={7}>
              <PredictMap/>
              </Col>
              <Col md={7}>
              <ActiveMap />
              </Col>
              </div>
              </Row>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
