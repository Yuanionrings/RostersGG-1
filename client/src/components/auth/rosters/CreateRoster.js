import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRoster } from '../../../actions/rosterAuthActions';
import { supportedGamesList, supportedGames } from '../../../util/selectSupportedGames';
import { supportedRegionsList, supportedRegions } from '../../../util/selectSupportedRegions';

class CreateRoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username,
      teamname: '',
      team_desc: '',
      game: '',
      region: '',
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const newRoster = {
      teamname: this.state.teamname,
      team_desc: this.state.team_desc,
      username: this.state.username,
      game: this.state.game,
      region: this.state.region
    }
    
    this.props.createRoster(newRoster, this.props.history);
  }

  render() {
    const { teamname, team_desc, errors } = this.state;

    return (
      <div className='form-box'>
        <form className='signup-form' onSubmit={this.onSubmit}>

          <div>
            <Link to='/dashboard'>
                <i className='fa fa-arrow-circle-left'></i>
                {" "}To Dashboard
            </Link>
          </div>

          <h3>Create New Roster</h3>

          <div className='form-group'>
            <label>Team Name: </label>
            <input type='text'
              id='teamname'
              placeholder='Team Name'
              value={teamname}
              error={errors.teamname}
              onChange={this.onChange}
              className={classnames('form-control', {
                invalid: errors.teamname
              })} />
            <span className='red-text'>{errors.teamname}</span>
          </div>
          

          <div className='form-group'>
          <label>Team Description: </label>
            <input type='text'
              id='team_desc'
              placeholder='Description'
              value={team_desc}
              error={errors.team_desc}
              onChange={this.onChange}
              className={classnames('form-control', {
                invalid: errors.team_desc
              })} />
            <span className='red-text'>{errors.team_desc}</span>
          </div>
          

          <div className='form-group'>
            <label>Game Played: </label>
            <select 
              value={this.state.game} 
              id='game'
              error={errors.game}
              onChange={this.onChange} 
              className={classnames('form-control', {
                invalid: errors.game
              })}>
              <option selected value='no-game'>Select a Game:</option>
              {supportedGamesList(supportedGames)}
            </select>
            <span className='red-text'>{errors.game}</span>
          </div>
          

          <div className='form-group'>
            <label>Primary Region: </label>
            <select 
              value={this.state.region} 
              id='region'
              error={errors.region}
              onChange={this.onChange}
              className={classnames('form-control', {
                invalid: errors.region
              })}>
              <option selected value='no-region'>Select a Region:</option>
              {supportedRegionsList(supportedRegions)}
            </select>
            <span className='red-text'>{errors.region}</span>
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-primary btn-block btn-lg'>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

CreateRoster.propTypes = {
    createRoster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createRoster })(CreateRoster);