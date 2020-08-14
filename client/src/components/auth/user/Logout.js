import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/userAuthActions';

class Logout extends Component {
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
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        this.logoutUser();
    }

    render() {

        return (
            <div className='form-box'>
                <form className='signup-form extra-margin-bottom' onSubmit={this.onSubmit}>
                    <h3>Test</h3>
                </form>
            </div>
        )
    }
}

Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Logout));