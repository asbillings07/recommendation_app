import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">Recommendation App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            <Nav.Link href="#friends">Friends</Nav.Link>
                            <Nav.Link href="#settings">Settings</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#signout">Sign Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


export default Navigation;