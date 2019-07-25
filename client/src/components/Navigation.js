import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = ({ context }) => {
  const authorizedUser = context.authorizedUser;
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Recommend It!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {authorizedUser ? (
            <React.Fragment>
              <Nav className="mr-auto">
                <Nav.Link href="#profile">Profile</Nav.Link>
                <Nav.Link href="#friends">Friends</Nav.Link>
                <Nav.Link href="#settings">Settings</Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#signout">Sign Out</Nav.Link>
              </Nav>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav className="mr-auto">
                <Nav.Link href="/signin">SignIn</Nav.Link>
                <Nav.Link href="/signup">SignUp</Nav.Link>
              </Nav>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
