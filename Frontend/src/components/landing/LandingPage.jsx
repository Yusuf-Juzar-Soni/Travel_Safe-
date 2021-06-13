import React from 'react';
import { Redirect } from 'react-router';
import {
  Jumbotron, Container, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../../App.css';
import image from "../../images/world-map.jpg";

export default function LandingPage() {
  return (
    <div>
      <div>
        <NavBar />
        <Jumbotron>
        <figure className="position-relative">
        <img src={image} alt="background" className="img-fluid" width="100%" height="700px"/>
        <figcaption>
          Making Pandemic Travel Safer !
        </figcaption>
        </figure>
        {/* <img src={splitimage} width="100%" height="920px"/> */}
          {/* <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <Jumbotron>
                <Container>
                </Container>
              </Jumbotron>
            </Col>
          </Row> */}
        </Jumbotron>
      </div>
    </div>
  );
}
