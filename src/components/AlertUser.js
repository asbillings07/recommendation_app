import PropTypes from 'prop-types'
import { Alert, Container, Row, Col } from 'react-bootstrap'
import React from 'react'

export const AlertUser = ({ heading, text, linkText, link, type }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs md lg='auto'>
          <Alert variant={type}>
            <Alert.Heading>{heading}</Alert.Heading>
            <p>{text}</p>
            <hr />
            <Alert.Link href={link} className='mb-0'>
              {linkText}
            </Alert.Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

AlertUser.propTypes = {
  heading: PropTypes.string.isRequired,
  link: PropTypes.any,
  linkText: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}
