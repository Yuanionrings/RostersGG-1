import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class ConfirmEmail extends Component {
  constructor() {
    super()
    this.state = {
        confirm_successful: false,
        errors: {}
    }
  }

  componentDidMount() {
    axios.post("http://localhost:5000/api/users/confirm-email/" + this.props.match.params.id)
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
      this.props.history.push("/login");
  }
  onGoToHome = e => {
      this.props.history.push("/");
  }

  render() {
    return (
      <div className="form-box">
        <div className="display-info">
            {this.state.confirm_successful ?
                <h2>Confirm Successful</h2>
            :
                <h2>Confirm Not Successful</h2>
            }
            <hr />

            {this.state.confirm_successful ?
                <div>
                    <p>Your email is now confirmed. Press the button below to be directed to the login screen.</p>
                    <Button
                        onClick={this.onGoToLogin}
                        className=""
                        >Go to Login</Button>
                </div>
            :
                <div>
                    <p>There was an error confirming your email, please contact support at contact@rosters.gg</p>
                    <Button
                        onClick={this.onGoToHome}
                        className=""
                        >Go Back</Button>
                </div>
            }
        </div>
      </div>
    )
  }
}
