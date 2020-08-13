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
                    <Col className='secondary-bg-light' sm={3} md={2}>
                    <SideNav
                        onSelect={(selected) => {
                            // Add your code here
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="charts">
                                <NavIcon>
                                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Charts
                                </NavText>
                                <NavItem eventKey="charts/linechart">
                                    <NavText>
                                        Line Chart
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="charts/barchart">
                                    <NavText>
                                        Bar Chart
                                    </NavText>
                                </NavItem>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    </Col>

                    <Col className='primary-bg-light' sm={9} md={10}>
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