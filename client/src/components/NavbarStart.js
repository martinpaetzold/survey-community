import { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavbarNavigation() {
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
        </Navbar>
    );
}
