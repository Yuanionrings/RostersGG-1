import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';

import RostersGGBlueLogo from '../../../assets/logos/rostersgg-beta-blue.svg';

const DashHeader = () => {
    return (
        <div className='dashboard-header'>
            <Navbar className='header-nav'>
                <NavbarBrand className='header-logo-text' href='/'>
                    <img src={RostersGGBlueLogo} alt='RostersGG Logo' />
                </NavbarBrand>
            </Navbar>
            <div className='header-divider'></div>
        </div>
    )
}

export default DashHeader;