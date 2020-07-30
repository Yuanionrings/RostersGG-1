import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";

let NavigationBar = (props) => {

    var conditionalNavItems = () => {
        return props.authenticated ?
        <Nav className="ml-auto">
            <Nav.Link className="secondary-text-light" href="/dashboard">Dashboard</Nav.Link>
        </Nav>
        :
        <Nav className="ml-auto">
            <Nav.Link className="secondary-text-light" href="/login">Login</Nav.Link>
            <Nav.Link className="secondary-text-light" href="/register">Register</Nav.Link>
        </Nav>
    }

    return (
        <div>
            <Navbar className="navbar-spec primary-bg-dark">
                <NavbarBrand className="mr-auto secondary-text-light bold-text" href="/">RostersGG</NavbarBrand>
                {conditionalNavItems(props.auth)}
            </Navbar>
            <div className="navbar-divider"></div>
        </div>
    )
    
}

export default NavigationBar;