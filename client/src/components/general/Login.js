import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userAuthActions';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import toastNotif from '../../util/toastNotif';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    this.displayAccountCreatedToast()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  displayAccountCreatedToast() {
    if(this.props.location.state){
      if (this.props.location.state.toast_message) {
        toast.success(toastNotif(this.props.location.state.toast_message), {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData);
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className='form-box'>

        <form className='login-form' onSubmit={this.onSubmit}>
          <h3>Login</h3>

          <div className='form-group'>
            <label>Email: </label>
            <input type='email'
              id='email'
              placeholder='Email Address'
              value={email}
              error={errors}
              onChange={this.onChange}
              className={classnames('form-control', {
                invalid: errors.email || errors.emailnotfound
              })} />
            <span className='red-text'>
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>

          <div className='form-group'>
            <label>Password: </label>
            <input type='password'
              id='password'
              placeholder='Password'
              value={password}
              error={errors}
              onChange={this.onChange}
              className={classnames('form-control', {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className='red-text'>
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block btn-lg'>Login</button>
          </div>
          <div className='text-center'>Don't have an account? <Link to='/register'>Register</Link></div>
          
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);