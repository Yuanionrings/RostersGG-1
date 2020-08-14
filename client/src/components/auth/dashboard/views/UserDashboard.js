import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashHeader from '../DashHeader';
import DashTitle from '../DashTitle';
import DashSidebar from '../DashSidebar';
import DashFooter from '../DashFooter';

import UserInfo from '../../user/UserInfo';
import UpcomingEvents from '../../user/UpcomingEvents';
import LedRosters from '../../rosters/LedRosters';
import MyRosters from '../../rosters/MyRosters';

import { toast } from 'react-toastify';
import toastNotif from '../../../../util/toastNotif';

class UserDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        this.displayToast()
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

    render() {
        return (
            <div className='dashboard-container'>
                <DashHeader />
                <DashSidebar
                    auth={this.props.auth}/>

                    <div className='content'>

                        <DashTitle page_title='User Dashboard' />
                        
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

                <DashFooter />
            </div>
        );
    }
}

UserDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(UserDashboard);