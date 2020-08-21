import React from 'react';
import { Link } from 'react-router-dom';

const RosterListingCard = props => {
    return (
        <div className='roster-listing-card'>
            <div className='text'>
                <h5 className='mb-0'>
                    <Link to={`/roster/${props.roster._id}`}>{props.roster.teamname}</Link>
                </h5>
                <p className='filler-text'>{props.roster.game} | {props.roster.region}</p>
            </div>
        </div>
    );
}

export default RosterListingCard;