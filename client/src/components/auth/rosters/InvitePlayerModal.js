import React, { Component } from 'react';
import { getCorrectPath } from '../../../util/developmentHelper';
import axios from 'axios';

function displayRostersInModal(auth, username_to_invite, history, rosters) {
    if(rosters) {
        if (rosters.length > 0) {
            return rosters.map(function(currentRoster, i){
                if(!currentRoster.players.includes(username_to_invite)){
                    return <InviteRosterListing roster={currentRoster} 
                                            key={i}
                                            auth={auth} 
                                            invitee={username_to_invite} 
                                            history={history} />
                }
            });
        } else {
            return <p className='filler-text'>You do not lead any rosters.</p>
        }
    } else {
        return <p className='filler-text'>You do not lead any rosters.</p>
    }
}

class InviteRosterListing extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors: {}
        }
    }

    invitePlayerToRoster(team_id, username_to_invite, history) {
        const rosterInviteData = {
            invited_player: username_to_invite
        };
        const invitePlayerRoute = getCorrectPath(`/api/rosters/roster/${team_id}/invite`);
        axios.post(invitePlayerRoute, rosterInviteData)
            .then(res => {
                const path = `/roster/${team_id}`;
                history.push({
                    pathname: path,
                    state: { toast_message: `User ${username_to_invite} was successfully invited` }
                });
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
            })
    }

    render() {
        return (
            <div>
                <button className='btn-primary'
                    onClick={() => this.invitePlayerToRoster(
                            this.props.roster._id,
                            this.props.invitee,
                            this.props.history
                            )}>
                    {this.props.roster.teamname}
                </button>
                <span className='red-text'>{this.state.errors.player_username}</span>
            </div>
        )
    }
}

const InvitePlayerModal = props => {
    return(
        <div>
            <h5>Invite {props.user.name} to:</h5>
            {displayRostersInModal(props.auth, props.user.username, props.history, props.rosters)}
        </div>
    )
};

export default InvitePlayerModal;