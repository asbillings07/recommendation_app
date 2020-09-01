import PropTypes from 'prop-types'
import { Navbar } from 'react-bootstrap'
import { NavDiv, NavBar, NavBarTitle } from '../elements'
import { NavHeading } from '../layouts'
import React from 'react'

export const NavHeader = ({ title, authorizedUser }) => {
  return (
    <NavDiv>
      <NavBar collapseOnSelect expand='lg'>
        <NavBarTitle aria-label='App Title is RecommendIt' href='/'>
          {title}
        </NavBarTitle>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {authorizedUser ? (
            <NavHeading
              linkMessage={`Welcome, ${authorizedUser.firstName}!`}
              user={authorizedUser}
              itemOne='Profile'
              itemTwo='Sign Out'
              hrefOne='/profile'
              hrefTwo='/signout'
            />
          ) : (
            <NavHeading
              linkMessage={`Welcome!`}
              user={authorizedUser}
              itemOne='Sign In'
              itemTwo='Sign Up'
              hrefOne='/signin'
              hrefTwo='/signup'
            />
          )}
        </Navbar.Collapse>
      </NavBar>
    </NavDiv>
  )
}

NavHeader.propTypes = {
  authorizedUser: PropTypes.shape({
    firstName: PropTypes.string
  }),
  children: PropTypes.any,
  title: PropTypes.string
}

/* 
  <Nav className='mr-auto'></Nav>
              <Nav>
                <NavLink aria-label='Welcome, User!' user='true'>
                  Welcome, User!
                </NavLink>
                <NavLink aria-label='This link displays the signIn page' href='/signin'>
                  SignIn
                </NavLink>
                <NavLink aria-label='This link displays the signup page' href='/signup'>
                  SignUp
                </NavLink>
              </Nav>
  
  
  <>
              <Nav className='mr-auto'></Nav>
              <Nav variant='pills'>
                <NavLink
                  aria-label={`Welcome, ${authorizedUser.firstName}!`}
                  user='true'
                >{`Welcome, ${authorizedUser.firstName}!`}</NavLink>
                <Nav.Item>
                  <NavLink aria-label='This link displays the Profile page' href='/profile'>
                    Profile
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink aria-label='This link logs you out' href='/signout'>
                    Sign Out
                  </NavLink>
                </Nav.Item>
              </Nav>
            </> */
