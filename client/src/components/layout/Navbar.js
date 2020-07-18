import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";

let NavBar = (props) => {

    //console.log(props);
    var conditionalNavItems = () => {
        return props.authenticated ?
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
        <Navbar className="navbar-spec">
            <NavbarBrand className="mr-auto" href="/">RostersGG</NavbarBrand>
            {conditionalNavItems(props.auth)}
        </Navbar>
    )
    
}

export default NavBar;