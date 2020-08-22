import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUser } from '../../../actions/userAuthActions';
import classnames from 'classnames';
import { getCorrectPath } from '../../../util/developmentHelper';

class EditUser extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            biography: '',
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.user.username !== this.props.match.params.username) {
            const path = `/dashboard`;
            const toast_message = `You are not authorized to edit other accounts`;
            this.props.history.push({
                pathname: path,
                state: { toast_message: toast_message,
                         toast_status: 'error' }
            });
        }

        const getUserInfoRoute = getCorrectPath(`/api/users/${this.props.auth.user.username}`);
        axios.get(getUserInfoRoute)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    username: res.data.username,
                    biography: res.data.biography,
                    email: res.data.email
                })
            }).catch(err => {
                console.log(err);

                // This seems like it's the only way to "log out" of session if user isn't found.
                localStorage.removeItem('jwtToken');
                window.location.reload(false);
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
                biography: this.state.biography,
                email: this.state.email,
                password: this.state.password
            }
        } else {
            updatedUser = {
                name: this.state.name,
                username: this.state.username,
                biography: this.state.biography,
                email: this.state.email
            }
        }
        this.props.editUser(updatedUser, this.props.history);
    }

    render() {
        const { name, username, biography, email, password, errors } = this.state;

        return (
            <div className='form-box'>
                <form className='signup-form extra-margin-bottom' onSubmit={this.onSubmit}>

                    <div className='mb-2'>
                        <Link to='/dashboard'>
                            <i className='fa fa-arrow-circle-left'></i>
                            {" "}To Dashboard
                        </Link>
                    </div>

                    <h3>Edit User</h3>
                    
                    <div className='form-group'>
                        <label>Change Display Name: </label>
                        <input type='text'
                            id='name'
                            placeholder='Name'
                            value={name}
                            error={errors.name}
                            onChange={this.onChange}
                            className={classnames('form-control', {
                                invalid: errors.name
                            })} />
                        <span className='red-text'>{errors.name}</span>
                    </div>

                    <div className='form-group'>
                        <label>Change Biography: </label>
                        <input type='text'
                            id='biography'
                            placeholder='Biography'
                            value={biography}
                            error={errors.biography}
                            onChange={this.onChange}
                            className={classnames('form-control', {
                                invalid: errors.biography
                            })} />
                        <span className='red-text'>{errors.biography}</span>
                    </div>

                    <div className='form-group'>
                        <label>Username (cannot be changed): </label>
                        <input type='text'
                            id='username'
                            placeholder='Username'
                            value={username}
                            error={errors.username} 
                            readOnly={true}
                            className={classnames('form-control', {
                                invalid: errors.username
                            })} />
                        <span className='red-text'>{errors.username}</span>
                    </div>

                    <div className='form-group'>
                        <label>Email (contact support to change): </label>
                        <input type='email'
                            id='email'
                            placeholder='Email Address'
                            value={email}
                            error={errors.email}
                            readOnly={true}
                            className={classnames('form-control', {
                                invalid: errors.email
                            })} />
                        <span className='red-text'>{errors.email}</span>
                    </div>

                    <div className='form-group'>
                        <label>Change Password: </label>
                        <input type='password'
                            id='password'
                            placeholder='Password'
                            value={password}
                            error={errors.password}
                            onChange={this.onChange}
                            className={classnames('form-control', {
                                invalid: errors.password
                            })} />
                        <span className='red-text'>{errors.password}</span>
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary btn-block btn-lg'>Submit Changes</button>
                        <span className='red-text'>{errors.badrequest}</span>
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