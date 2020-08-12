import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Landing extends Component {
  
  goToRegister = e => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div className='landing-page-display'>
        <div className='header'>
          <div className='display'>
            <div className='content'>
              <h5>INTRODUCING ROSTERS.GG</h5>
              <h2>The only all-in-one tool your eSports team will ever need</h2>
              <h4>RostersGG helps gaming team leaders and players with scheduling, communication, and other team management tasks.</h4>
              <div className="button-div">
                <Button className="register-button" 
                onClick={this.goToRegister}>
                  Register for Free <i className='fa fa-arrow-circle-right'></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='section-1'>
          <div className='display'>
            <div className='content'>
              <div className='text-area'>
                <h3>FOR LEADERS</h3>
                <h4>
                  Until you operate an eSports team, you never know overwhelming it can be. RostersGG was built for team leaders, by team leaders. No longer worry about 
                  scheduling, communication with your players, or keeping track of player rosters.
                </h4>
              </div>
              <div className='text-area'>
                <h3 className='right-align'>FOR PLAYERS</h3>
                <h4 className='right-align'>
                  Never again worry about when your next practice or scrimmage is, RostersGG displays all of your upcoming events right on your user dashboard. Getting sick 
                  of your current team? Browse through all rosters on the platform - filter by name, game played, and primary region to find the best teams!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className='section-2'>
          <div className='display'>
            <div className='content'>
              <h3>This application is not yet released.</h3>
              <h4>
                You are currently using the early-access BETA version. 
                There is still so much functionality in development - stay tuned so you do not miss out. 
                Did somebody say integrated Discord bot? Email contact@rosters.gg if you are 
                interested in contributing or earning premium functionality as an early adopter.
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
