import { Alert, Container, Row, Col } from 'react-bootstrap';
import React from 'react';

export const AlertUser = ({ heading, text, linkText, link }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs md lg="auto">
          <Alert variant="danger">
            <Alert.Heading>{heading}</Alert.Heading>
            <p>{text}</p>
            <hr />
            <Alert.Link href={link} className="mb-0">
              {linkText}
            </Alert.Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};
