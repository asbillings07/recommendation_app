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
            <React.Fragment>
              <Nav className="mr-auto">
                {/* <Nav.Link href="#friends">Friends</Nav.Link> */}
              </Nav>

              <Nav>
                <NavLink href="/profile">Profile</NavLink>
                <NavLink href="/signout">Sign Out</NavLink>
              </Nav>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav className="mr-auto">
                {/* <NavLink href="#friends">Friends</NavLink> */}
                <NavLink href="/signin">SignIn</NavLink>
                <NavLink href="/signup">SignUp</NavLink>
              </Nav>
            </React.Fragment>
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
  background-color: #0b438c !important;
`;
const NavBarTitle = styled(NavBar.Brand)`
  color: white !important;
`;
const NavLink = styled(Nav.Link)`
  color: white !important;
`;
