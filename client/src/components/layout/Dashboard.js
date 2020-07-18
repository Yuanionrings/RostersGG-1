import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_username: '',
      user_email: ''
    }
  }

  onEdit = e => {
    e.preventDefault();
    this.props.history.push('/editprofile')
  }

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/users/" + this.props.auth.user.username)
      .then(res => {
        this.setState({
          user_name: res.data.name,
          user_username: res.data.username,
          user_email: res.data.email
        });
      })
      .catch(function (err) {
        console.log(err);

        // This seems like it's the only way to "log out" of session if user isn't found.
        localStorage.removeItem("jwtToken");
        window.location.reload(false);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
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

            <Button
              variant="outline-primary"
              onClick={this.onEdit}
            >Edit Profile</Button>

            <Button
              variant="outline-primary"
              onClick={this.onLogout}
            >Logout</Button>

          </Col>
        </Row>
      </Container>
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