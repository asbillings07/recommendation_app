import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

export default props => (
  <Container className="mt-5">
    <Row className="justify-content-md-center">
      <Col xs md lg="auto">
        <FontAwesomeIcon
          className={`fadeIn ${props.spinning}`}
          icon={faSync}
          size={props.size}
        />
        <br />
        <h1>{'Loading.....'}</h1>
      </Col>
    </Row>
  </Container>
);
