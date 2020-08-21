import React from 'react';
import { Link } from 'react-router-dom';

const UserListingCard = props => {
    return (
        <div className='user-listing-card'>
            <div className='text'>
                <h5 className='mb-0'>
                    <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
                </h5>
                <p className='filler-text'>@{props.user.username}</p>
            </div>
        </div>
    );
}

export default UserListingCard;