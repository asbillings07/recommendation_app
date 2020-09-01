import PropTypes from 'prop-types'
import React from 'react'
import { NavLink, NavContainer } from '../elements'
import { Nav } from 'react-bootstrap'

export const NavHeading = ({
  linkMessage,
  user,
  itemOne,
  itemTwo,
  variant = '',
  hrefOne,
  hrefTwo
}) => {
  return (
    <NavContainer>
      <Nav variant={variant}>
        <NavLink user={user}>{linkMessage}</NavLink>
        <Nav.Item>
          <NavLink aria-label='This link displays the Profile page' href={hrefOne}>
            {itemOne}
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink aria-label='This link logs you out' href={hrefTwo}>
            {itemTwo}
          </NavLink>
        </Nav.Item>
      </Nav>
    </NavContainer>
  )
}

NavHeading.propTypes = {
  hrefOne: PropTypes.string.isRequired,
  hrefTwo: PropTypes.string.isRequired,
  itemOne: PropTypes.string.isRequired,
  itemTwo: PropTypes.string.isRequired,
  linkMessage: PropTypes.string.isRequired,
  user: PropTypes.object,
  variant: PropTypes.string
}
