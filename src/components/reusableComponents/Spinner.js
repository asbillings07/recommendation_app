import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

export const Spinner = ({ size, loadingMsg = 'Loading...', children }) => (
  <Container aria-label='loading page' className='mt-5'>
    <Row className='justify-content-md-center'>
      <Col xs md lg='auto'>
        <FontAwesomeIcon className={`fadeIn spinning`} icon={faSync} size={size} />
        <br />
      </Col>
      {children ? { children } : <StyledLoading>{loadingMsg}</StyledLoading>}
    </Row>
  </Container>
)

Spinner.propTypes = {
  children: PropTypes.any,
  loadingMsg: PropTypes.string,
  size: PropTypes.any.isRequired
}

const StyledLoading = styled.h1`
  margin-top: 3px;
`
