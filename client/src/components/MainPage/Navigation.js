import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const Navigation = ({ context }) => {
  const authorizedUser = context.authorizedUser;
  return (
    <NavDiv>
      <NavBar collapseOnSelect expand="lg">
        <NavBarTitle href="/">Recommend It!</NavBarTitle>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {authorizedUser ? (
            <>
              <Nav className="mr-auto"></Nav>
              <Nav variant="pills">
                <NavLink user="true">{`Welcome, ${authorizedUser.firstName}!`}</NavLink>
                <Nav.Item>
                  <NavLink href="/profile">Profile</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink href="/signout">Sign Out</NavLink>
                </Nav.Item>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="mr-auto"></Nav>
              <Nav>
                <NavLink user="true">Welcome, User!</NavLink>
                <NavLink href="/signin">SignIn</NavLink>
                <NavLink href="/signup">SignUp</NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </NavBar>
    </NavDiv>
  );
};

export default Navigation;

const NavDiv = styled.div`
  margin-bottom: 0px;
`;
const NavBar = styled(Navbar)`
  background-color: #f25c05 !important;
`;
const NavBarTitle = styled(NavBar.Brand)`
  color: white !important;
`;
const NavLink = styled(Nav.Link)`
  color: ${props => (props.user ? 'black' : 'white')} !important;
`;
