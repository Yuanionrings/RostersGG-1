import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_name: '',
            user_username: '',
            user_email: ''
        }
    }

    onLogout = e => {
      e.preventDefault();
      this.props.logoutUser();
    };

    componentDidMount(){
      axios.get("http://localhost:5000/api/users/"+ this.props.auth.user.username)
        .then(res => {
          console.log(res.data);
            this.setState({
                user_name: res.data.name,
                user_username: res.data.username,
                user_email: res.data.email
            })
        })
        .catch(function(err){
            console.log(err);
        });
    }

    render() {
      console.log("DASHBOARD STATE:=============")
      console.log(this.state)
      return (
        <div  className="container text-center mt-15">
          <div className="row">
            <div className="col-sm-12">
              <h4>
                Hey there, <b className="name-lable">{this.state.user_name}</b>
                <p className="mt-4">
                  You are logged into{" "}
                  <span style={{ fontFamily: "monospace" }}>RostersGG</span>
                </p>
                <p className="">
                  under the username,{" "}
                  <span style={{ fontFamily: "monospace" }}>{this.state.user_username}</span>
                </p>
                <p>{this.state.email}</p>
              </h4>
              <button
                onClick={this.onLogout}
                className="btn btn-large btn-light hoverable font-weight-bold"
              >
                Logout
              </button>
            </div>
          </div>
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