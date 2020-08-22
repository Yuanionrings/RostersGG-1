import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getCorrectPath } from '../../../../util/developmentHelper';

import DashHeader from '../DashHeader';
import DashTitle from '../DashTitle';
import DashSidebar from '../DashSidebar';
import DashFooter from '../DashFooter';

import UserSearch from '../../user/UserSearch';

import { toast } from 'react-toastify';
import toastNotif from '../../../../util/toastNotif';


class PlayerDirectoryView extends Component {

    constructor(props){
        super(props);
        this.state = {
            myRosters: []
        }
    }

    componentDidMount(){
        this.displayToast();

        const getLedRostersRoute = getCorrectPath(`/api/rosters/${this.props.auth.user.username}/led-rosters`);
        axios.get(getLedRostersRoute)
            .then(res => {
                this.setState({
                    myRosters: res.data
                });
            })
            .catch(function(err) {
                console.log(err);
            });
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

                        <DashTitle page_title='Player Directory' />
                        <UserSearch auth={this.props.auth} 
                                    history={this.props.history} 
                                    rosters={this.state.myRosters} />

                    </div>

                <DashFooter />
            </div>
        );
    }
}

PlayerDirectoryView.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(PlayerDirectoryView);