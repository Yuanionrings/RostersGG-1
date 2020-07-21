import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAuthActions";
import MyRosters from "../rosters/MyRosters";
import UserInfo from "./UserInfo";
import UserEvents from "./UserEvents";
import Button from "react-bootstrap/Button";


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        console.log(this.props)
    }
    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render() {
        return (
            <div className="fluid-container">
                <div className="general-thin-display-box">
                  <div>
                    <p><b>You are currently viewing the Dashboard as: </b> <i>{this.props.auth.user.username}</i></p>
                    <Button
                          className="float-right"
                          onClick={this.onLogout}
                      >Logout</Button>
                  </div>
                </div>
                <UserInfo
                    given_username={this.props.auth.user.username} 
                    history={this.props.history} />
                <UserEvents 
                    username={this.props.auth.user.username} 
                    history={this.props.history} />
                <MyRosters 
                    username={this.props.auth.user.username} 
                    history={this.props.history} />
                <div className="filler-lg"></div>
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