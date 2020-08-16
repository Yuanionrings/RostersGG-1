import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashHeader from '../DashHeader';
import DashTitle from '../DashTitle';
import DashSidebar from '../DashSidebar';
import DashFooter from '../DashFooter';

import { toast } from 'react-toastify';
import toastNotif from '../../../../util/toastNotif';


class TeamDirectoryView extends Component {

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

                        <DashTitle page_title='Team Directory (in development)' />

                    </div>

                <DashFooter />
            </div>
        );
    }
}

TeamDirectoryView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(TeamDirectoryView);