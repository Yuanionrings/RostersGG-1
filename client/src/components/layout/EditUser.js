import React, { Component } from "react";
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser } from "../../actions/authActions";
import classnames from "classnames";

class EditUser extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            errors: {}
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
        axios.get("http://localhost:5000/api/users/" + this.props.auth.user.username)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    username: res.data.username,
                    email: res.data.email
                })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        var updatedUser;
        if (this.state.password) {
            updatedUser = {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        } else {
            updatedUser = {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email
            }
        }
        this.props.editUser(updatedUser, this.props.history);
    }

    render() {
        const { name, username, email, password, errors } = this.state;

        return (
            <div className="form-box ">
                <form className="signup-form" onSubmit={this.onSubmit}>

                    <div><Link to="/dashboard"><i className="fa fa-arrow-circle-left  "></i> Back to Dashboard</Link></div>

                    <h2>Edit User</h2>
                    <hr />
                    <div className="form-group">
                        <label>Display Name: </label>
                        <input type="text"
                            id="name"
                            placeholder="Name"
                            value={name}
                            error={errors.name}
                            onChange={this.onChange}
                            className={classnames("form-control", {
                                invalid: errors.name
                            })} />
                        <span className="red-text">{errors.name}</span>
                    </div>

                    <div className="form-group">
                        <label>Username (cannot be changed): </label>
                        <input type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            error={errors.username}
                            className={classnames("form-control", {
                                invalid: errors.username
                            })} />
                        <span className="red-text">{errors.username}</span>
                    </div>

                    <div className="form-group">
                        <label>Change Email: </label>
                        <input type="email"
                            id="email"
                            placeholder="Email Address"
                            value={email}
                            error={errors.email}
                            onChange={this.onChange}
                            className={classnames("form-control", {
                                invalid: errors.email
                            })} />
                        <span className="red-text">{errors.email}</span>
                    </div>

                    <div className="form-group">
                        <label>Change Password: </label>
                        <input type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            error={errors.password}
                            onChange={this.onChange}
                            className={classnames("form-control", {
                                invalid: errors.password
                            })} />
                        <span className="red-text">{errors.password}</span>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">Submit Changes</button>
                    </div>

                </form>
            </div>
        )
    }
}

EditUser.propTypes = {
    editUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { editUser })(withRouter(EditUser));