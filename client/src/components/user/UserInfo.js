import React, { Component } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";

class UserInfo extends Component {
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
    componentDidMount() {
        console.log(this.props)
        axios.get("http://localhost:5000/api/users/" + this.props.given_username)
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
            <div className="general-display-box">
                <div>
                    <h2 className="">
                        Welcome back, <i>{this.state.user_name}</i>!
                        <Button
                            onClick={this.onEdit}
                            className="float-right"
                            >Edit Profile</Button>
                    </h2>
                    <h6>Here is a snapshot of all of my profile information: </h6>
                    <hr />
                    <p className="">
                        <b>Username: </b> {this.state.user_username}<br/>
                        <b>Email: </b> {this.state.user_email}
                    </p>
                </div>
            </div>
        )
    }
}

export default UserInfo;