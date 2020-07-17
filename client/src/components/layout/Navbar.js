import React from "react";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";

let NavBar = (props) => {

    console.log(props);
    const conditionalNavItems = (auth) => {
        return auth.isAuthenticated ?
        <Nav className="ml-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/editprofile">Edit Profile</Nav.Link>
        </Nav>
        :
        <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
    }

    return (
        <Navbar bg="dark" variant="dark">
            <NavbarBrand className="mr-auto" href="/">RostersGG</NavbarBrand>
            {conditionalNavItems(props.auth)}
        </Navbar>
    )
    
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired
};

export default NavBar;