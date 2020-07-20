import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Rosters from "../rosters/Rosters";
import UserInfo from "../layout/UserInfo";
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
                <div className="userinfo-thin-display-box">
                  <div>
                    <p><b>You are currently logged in as: </b> {this.props.auth.user.username}</p>
                    <Button
                          className="float-right"
                          onClick={this.onLogout}
                      >Logout</Button>
                  </div>
                </div>
                <UserInfo
                  given_username={this.props.auth.user.username} 
                  history={this.props.history}/>
                <Rosters username={this.props.auth.user.username} />
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