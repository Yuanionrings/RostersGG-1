import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { invitePlayerToRoster } from '../../../actions/rosterAuthActions';

class InvitePlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            player_username: '',
            team_id: this.props.team_id,
            errors: {}
        }
    }
    componentDidMount() {
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
        const rosterInviteData = {
            team_id: this.state.team_id,
            data: {
                invited_player: this.state.player_username
            }
        };
        this.props.invitePlayerToRoster(rosterInviteData, this.props.history);
    }
  
  render() {
    const { player_username, errors } = this.state;
    return (
        <div className='form-box'>
            <form className='signup-form' onSubmit={this.onSubmit}>

                <h2>Invite Player</h2>
                <p>Please enter the username of the player you'd like to invite.</p>
                <hr />
                
                <div className="form-group">
                    <label>Player's Username: </label>
                    <input type='text'
                        id='player_username'
                        placeholder='Player Username'
                        value={player_username}
                        error={errors.player_username}
                        onChange={this.onChange}
                        className={classnames('form-control', {
                            invalid: errors.player_username
                        })} />
                    <span className='red-text'>{errors.player_username}</span>
                </div>
                
                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-block btn-lg'>
                        Invite Player
                    </button>
                </div>

            </form>
        </div>
    )
  }
}

InvitePlayer.propTypes = {
    invitePlayerToRoster: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { invitePlayerToRoster })(InvitePlayer);