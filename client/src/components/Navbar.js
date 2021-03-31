import { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavbarNavigation({ first, profilePic }) {
    let title_menu = "Hello, " + first + "!";

    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="md">
            <Navbar.Brand href="/">
                <img
                    src="/logo_m.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="survey community"
                />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="/survey">Survey</Nav.Link>
                <Nav.Link href="/chat">Chat</Nav.Link>
                <Nav.Link href="/users">Search</Nav.Link>
                <NavDropdown title={title_menu} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">
                        Edit profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/profile">
                    <img
                        src={profilePic}
                        width="40"
                        height="40"
                        className="profilePictureNavbar d-inline-block align-top"
                        alt={first}
                    />
                </Nav.Link>
            </Navbar.Collapse>
            <Navbar.Brand href="/"></Navbar.Brand>
            <Navbar.Toggle />
        </Navbar>
    );
}
