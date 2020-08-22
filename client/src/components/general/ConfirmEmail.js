import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { getCorrectPath } from '../../util/developmentHelper';

import DashHeader from '../auth/dashboard/DashHeader';
import DashFooter from '../auth/dashboard/DashFooter';


export default class ConfirmEmail extends Component {
  constructor() {
    super()
    this.state = {
        confirm_successful: false,
        errors: {}
    }
  }

  componentDidMount() {
    const confirmEmailRoute = getCorrectPath(`/api/users/confirm-email/${this.props.match.params.id}`);
    axios.post(confirmEmailRoute)
        .then(res => {
            console.log(res);
            this.setState({
                confirm_successful: true
            });
        })
        .catch(err => {
            console.log(err);
        })
  }

  onGoToLogin = e => {
      this.props.history.push('/login');
  }
  onGoToHome = e => {
      this.props.history.push('/');
  }

  render() {
    return (

        <div className=''>
            <DashHeader />

            <div className='form-box'>
                <div className='display-info'>
                    {this.state.confirm_successful ?
                        <h3>Confirm Successful</h3>
                    :
                        <h3>Confirm Not Successful</h3>
                    }

                    {this.state.confirm_successful ?
                        <div>
                            <p>Your email is now confirmed. Press the button below to be directed to the login screen.</p>
                            <Button
                                onClick={this.onGoToLogin}
                                >Go to Login</Button>
                        </div>
                    :
                        <div>
                            <p>There was an error confirming your email, please contact support at contact@rosters.gg</p>
                            <Button
                                onClick={this.onGoToHome}
                                >Go Back</Button>
                        </div>
                    }
                </div>
            </div>

            <DashFooter />
        </div>
    )
  }
}
