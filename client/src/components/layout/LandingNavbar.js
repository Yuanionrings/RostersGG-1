import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Nav from 'react-bootstrap/Nav';

const LandingNavbar = () => {

    var conditionalNavItems = () => {
        if (localStorage.jwtToken) {
        return (
            <Nav className='ml-auto'>
                <Nav.Link className='' href='/dashboard'>Dashboard</Nav.Link>
            </Nav>

        )} else {
        return (
            <Nav className='ml-auto'>
                <Nav.Link className='' href='/login'>Login</Nav.Link>
                <Nav.Link className='' href='/register'>Register</Nav.Link>
            </Nav>
        )}
    }

    return (
        <div>
            <Navbar className='landing-navbar'>
                <NavbarBrand className='mr-auto' href='/'>
                    RostersGG<span className='beta-text'>BETA</span>
                </NavbarBrand>
                {conditionalNavItems()}
            </Navbar>
        </div>
    )
    
}

export default LandingNavbar;