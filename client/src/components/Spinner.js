import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

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
      </Col>
      <StyledLoading>{'Loading.....'}</StyledLoading>
    </Row>
  </Container>
);

const StyledLoading = styled.h1`
  margin-top: 3px;
`;
