import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import InvitePlayerModal from '../rosters/InvitePlayerModal';

import InvitationIcon from '../../../assets/icons/send-invitation.svg';
import DefaultProfile from '../../../assets/images/default_profile.svg';


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

                    <InvitePlayerModal 
                        user={props.user}
                        auth={props.auth}
                        history={props.history}
                        rosters={props.rosters}
                        />
                    <button className='btn-secondary' 
                    onClick={() => setModalIsOpen(false)}>Close</button>
                
            </Modal>
        </div>
    );
}

export default UserListingCard;