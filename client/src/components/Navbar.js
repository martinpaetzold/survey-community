import { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavbarNavigation({ first }) {
    return (
        <Navbar fixed="top" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img
                    src="/logo_m.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="survey community"
                />
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/survey">Survey</Nav.Link>
                <Nav.Link href="/chat">Chat</Nav.Link>
                <Nav.Link href="/users">Search</Nav.Link>
                <NavDropdown title="Profile" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/">Edit profile</NavDropdown.Item>
                    <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Hello, <a href="/">{first}</a>!
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}
