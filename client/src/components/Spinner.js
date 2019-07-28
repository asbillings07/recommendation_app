import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

export default props => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs md lg="auto">
        <FontAwesomeIcon
          className={`fadeIn ${props.spinning}`}
          icon={faSync}
          size={props.size}
        />
        <h1>{'Loading.....'}</h1>
      </Col>
    </Row>
  </Container>
);
