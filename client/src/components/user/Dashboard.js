import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userAuthActions';
import MyRosters from '../rosters/MyRosters';
import LedRosters from '../rosters/LedRosters';
import UserInfo from './UserInfo';
import UpcomingEvents from './UpcomingEvents';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { toast } from 'react-toastify';
import toastNotif from '../../util/toastNotif';

import LogoutIcon from '../../assets/icons/logout.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import UserIcon from '../../assets/icons/user.svg';
import PlayerDirIcon from '../../assets/icons/players-dir.svg';
import TeamDirIcon from '../../assets/icons/box-list.svg';
import EventsIcon from '../../assets/icons/calendar.svg';
import DashboardIcon from '../../assets/icons/star.svg';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        this.displayToast()
    }
    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    displayToast() {
        if(this.props.location.state){
            if (this.props.location.state.toast_message) {
                toast.success(toastNotif(this.props.location.state.toast_message), {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    onGoToViewUser = e => {
        e.preventDefault();
        this.props.history.push('/' + this.props.auth.user.username);
    }
    onGoToEditProfile = e => {
        e.preventDefault();
        this.props.history.push('/' + this.props.auth.user.username + '/edit');
    }
    render() {
        return (
            <div className='dashboard-container'>
                <Row>
                    <Col className='secondary-bg-light'>
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (this.props.location.pathname !== to) {
                                    this.props.history.push(to);
                                }
                            }}
                        >
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
                    </Col>

                    <Col className='primary-bg-light'>
                        <div className='content'>

                            <UserInfo
                                given_username={this.props.auth.user.username} 
                                history={this.props.history} />
                            <UpcomingEvents 
                                username={this.props.auth.user.username} 
                                history={this.props.history} />
                            <LedRosters 
                                username={this.props.auth.user.username} 
                                history={this.props.history} />
                            <MyRosters 
                                username={this.props.auth.user.username} 
                                history={this.props.history} />
                            
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);