import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Navigation = () => {
  const { authorizedUser } = useSelector((state) => state.users)
  return (
    <NavDiv>
      <NavBar collapseOnSelect expand='lg'>
        <NavBarTitle aria-label='App Title is RecommendIt' href='/'>
          Recommend It!
        </NavBarTitle>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {authorizedUser ? (
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
            </>
          ) : (
            <>
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
            </>
          )}
        </Navbar.Collapse>
      </NavBar>
    </NavDiv>
  )
}

export default Navigation

const NavDiv = styled.div`
  margin-bottom: 0px;
`
const NavBar = styled(Navbar)`
  background-color: #f25c05 !important;
`
const NavBarTitle = styled(NavBar.Brand)`
  color: white !important;
`
const NavLink = styled(Nav.Link)`
  color: ${(props) => (props.user ? 'black' : 'white')} !important;
`
