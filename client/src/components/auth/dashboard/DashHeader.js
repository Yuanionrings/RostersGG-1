import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';

const DashHeader = () => {
    return (
        <div className='dashboard-header'>
            <Navbar className='header-nav'>
                <NavbarBrand className='header-logo-text' href='/'>
                    RostersGG <span className='beta-text'>BETA</span>
                </NavbarBrand>
            </Navbar>
            <div className='header-divider'></div>
        </div>
    )
}

export default DashHeader;