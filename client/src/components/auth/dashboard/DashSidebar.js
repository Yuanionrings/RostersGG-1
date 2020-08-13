import React from 'react';
import { withRouter } from 'react-router-dom';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import LogoutIcon from '../../../assets/icons/logout.svg';
import SettingsIcon from '../../../assets/icons/settings.svg';
import UserIcon from '../../../assets/icons/user.svg';
import PlayerDirIcon from '../../../assets/icons/players-dir.svg';
import TeamDirIcon from '../../../assets/icons/box-list.svg';
import EventsIcon from '../../../assets/icons/calendar.svg';
import DashboardIcon from '../../../assets/icons/star.svg';


const DashSidebar = props => {

    function goToSelection(selectedKey) {
        // Redirects to new page if not on that page
        const toLink = '/' + selectedKey;
        if (this.props.location.pathname !== toLink) {
            this.props.history.push(toLink);
        } else {
            alert('You are already on this page.');
        }
    }

    return (
        <SideNav onSelect={(selected) => goToSelection(selected)}>
            <Toggle />
            <Nav defaultSelected='dashboard'>

                <NavItem eventKey='dashboard'>
                    <NavIcon>
                        <img src={DashboardIcon} alt='RostersGG Dashboard Icon' />
                    </NavIcon>
                    <NavText>Dashboard</NavText>
                </NavItem>

                <NavItem eventKey='event-manager'>
                    <NavIcon>
                        <img src={EventsIcon} alt='RostersGG Event Manager Icon' />
                    </NavIcon>
                    <NavText>Event Manager</NavText>
                </NavItem>

                <NavItem eventKey='team-directory'>
                    <NavIcon>
                        <img src={TeamDirIcon} alt='RostersGG Team Directory Icon' />
                    </NavIcon>
                    <NavText>Team Directory</NavText>
                </NavItem>

                <NavItem eventKey='player-directory'>
                    <NavIcon>
                        <img src={PlayerDirIcon} alt='RostersGG Player Directory Icon' />
                    </NavIcon>
                    <NavText>Player Directory</NavText>
                </NavItem>

                <NavItem eventKey='view-user'>
                    <NavIcon>
                        <img src={UserIcon} alt='RostersGG View User Icon' />
                    </NavIcon>
                    <NavText>View User Profile</NavText>
                </NavItem>

                <NavItem eventKey='edit-user'>
                    <NavIcon>
                        <img src={SettingsIcon} alt='RostersGG Edit User Icon' />
                    </NavIcon>
                    <NavText>Edit User Profile</NavText>
                </NavItem>

                <NavItem eventKey='logout'>
                    <NavIcon>
                        <img src={LogoutIcon} alt='RostersGG Logout Icon' />
                    </NavIcon>
                    <NavText>Logout</NavText>
                </NavItem>
            </Nav>
        </SideNav>
    );
};

export default withRouter(DashSidebar);