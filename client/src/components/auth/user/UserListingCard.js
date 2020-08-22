import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { getCorrectPath } from '../../../util/developmentHelper';

import InvitationIcon from '../../../assets/icons/send-invitation.svg';
import DefaultProfile from '../../../assets/images/default_profile.svg';

function displayRostersInModal(auth, username_to_invite, history, rosters) {
    if(rosters) {
        if (rosters.length > 0) {
            return rosters.map(function(currentRoster, i){
                return <InviteRosterListing roster={currentRoster} 
                                        key={i}
                                        auth={auth} 
                                        invitee={username_to_invite} 
                                        history={history} />
            });
        } else {
            return <p className='filler-text'>You do not lead any rosters.</p>
        }
    } else {
        return <p className='filler-text'>You do not lead any rosters.</p>
    }
    
}

const InviteRosterListing = props => {
    return (
        <div>
            <button className='btn-primary'
                onClick={() => onInviteToRoster(props.roster._id, props.invitee, props.history)}>
                {props.roster.teamname}
            </button>
        </div>
    )
}

function onInviteToRoster(team_id, username_to_invite, history) {
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
        console.log(err)
      })
}


const UserListingCard = props => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className='user-listing-card'>
            <div className='image-container'>
                <img src={DefaultProfile} alt='Default RostersGG Profile Icon' />
            
                <div className='text'>
                    <h5 className='mb-0'>
                        <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
                    </h5>
                    <p className='filler-text'>@{props.user.username}</p>
                </div>
            </div>
            
            <button className='invite-button' onClick={() => setModalIsOpen(true)}>
                <img src={InvitationIcon} alt='Invitation Icon to Invite to RostersGG Roster' />
            </button>

            <Modal  isOpen={modalIsOpen} 
                    ariaHideApp={false} 
                    onRequestClose={() => setModalIsOpen(false)}
                    className='invitation-modal'>

                    <h5>Invite {props.user.name} to:</h5>
                    {displayRostersInModal(props.auth, props.user.username, props.history, props.rosters)}
                    <div className=''>
                        <button className='btn-secondary' 
                            onClick={() => setModalIsOpen(false)}>Close</button>
                    </div>
                
            </Modal>
        </div>
    );
}

export default UserListingCard;