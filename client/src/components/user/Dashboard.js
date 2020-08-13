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
import LogoutIcon from '../../assets/icons/logout.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import UserIcon from '../../assets/icons/user.svg';
import PlayerDirIcon from '../../assets/icons/players-dir.svg';
import TeamDirIcon from '../../assets/icons/box-list.svg';
import EventsIcon from '../../assets/icons/calendar.svg';
import DashboardIcon from '../../assets/icons/star.svg';



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
    }
    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    displayToast() {
        try {
          if (this.props.location.state.toast_message) {
            toast(toastNotif(this.props.location.state.toast_message), {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        } catch(err) {
          console.log(err);
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
                {this.displayToast()}
                <Row>
                    <Col className='secondary-bg-light' sm={3} md={2}>
                        <div className='sidebar'>
                            <Button onClick={() => this.props.history.push('/dashboard')}>
                                <img src={DashboardIcon} alt='Dashboard Icon' />
                                {"   "}Dashboard</Button>

                            <Button onClick={() => console.warn('This is not implemented')}>
                                <img src={EventsIcon} alt='Events Icon' />
                                {"   "}Event Manager</Button>

                            <Button onClick={() => console.warn('This is not implemented')}>
                                <img src={TeamDirIcon} alt='Team Directory Icon' />
                                {"   "}Team Directory</Button>

                            <Button onClick={() => console.warn('This is not implemented')}>
                                <img src={PlayerDirIcon} alt='Players Directory Icon' />
                                {"   "}Player Directory</Button>

                            <Button onClick={this.onGoToViewUser}>
                                <img src={UserIcon} alt='User Icon' />
                                {"   "}View My Profile</Button>

                            <Button onClick={this.onGoToEditProfile}>
                                <img src={SettingsIcon} alt='Gear Icon' />
                                {"   "}Edit Profile</Button>

                            <Button onClick={this.onLogout}>
                                <img src={LogoutIcon} alt='Logout Icon' />
                                {"   "}Logout</Button>
                        </div>
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