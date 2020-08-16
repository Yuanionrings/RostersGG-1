import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { formatDateString } from '../../../util/formatDateString';

const PlayerInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
        </td>
        <td className=''>{props.user.username}</td>
        <td className=''>{formatDateString(props.user.date)}</td>
        <td className=''>
            <Button
                className='btn-secondary'
                onClick={() => onKickPlayer(props.user.username, props.history)}
                >Kick</Button>
        </td>
    </tr>
);

function onKickPlayer(given_username_to_remove, history) {
    const rosterRemoveData = {
        team_id: this.props.team_id,
        data: {
            username_to_remove: given_username_to_remove,
            player_initiated: false
        }
    };

    axios.post(`/api/rosters/roster/${rosterRemoveData.team_id}/remove`, rosterRemoveData.data)
        .then(res => {
        const path = `/roster/${rosterRemoveData.team_id}`;

        var conditional_toast_message;
        (rosterRemoveData.data.player_initiated) ? 
            conditional_toast_message = `You successfully left roster ${rosterRemoveData.team_id}`
        :
            conditional_toast_message = `User ${rosterRemoveData.data.username_to_remove} successfully kicked from roster`;

        history.push({
            pathname: path,
            state: { toast_message: conditional_toast_message }
        });
        })
        .catch(err => {
        console.log(err);
        })
}

class ManagePlayers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
    }

    componentDidMount() {
        axios.get(`/api/rosters/roster/${this.props.team_id}/players`)
            .then(res => {
                this.setState({
                    players: res.data
                });
            }).catch(err => {
                console.log(err);
            });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }


    playerList(my_username){
        return this.state.players.map(function(currentPlayer, i){
            if(currentPlayer.username !== my_username) { 
                return <PlayerInfo
                        user={currentPlayer} 
                        history={this.props.history} />
            }
        });
    }
  
    render() {
        return (
            <div className='form-box'>
                <div className='player-list'>
                    <h3>Manage Players</h3>
                    
                    {(this.state.players.length > 1) ? 
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Date Joined RostersGG</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.playerList(this.props.auth.user.username) }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text'>You are the only player on this roster.</p>
                    }
                </div>
            </div>
        )
    }
}

ManagePlayers.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps)(ManagePlayers);