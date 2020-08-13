import React from 'react';
import calcTimeUntil from '../../../util/calcTimeUntil';
import { formatDateString } from '../../../util/formatDateString';

const EventCard = props => {
    return (
        <div className='event-card'>
            <h5 className='mb-0'>{props.name}</h5>
            <p className='mt-0 mb-2'>{props.description}</p>
            <p className='mt-2 mb-0'>Associated Teams: <span className='filler-text'>{props.team_names}</span></p>
            <p className='mt-0 filler-text'>{formatDateString(props.when)}</p>
            <hr />
            <p className='filler-text'>
                <strong>Time until event: </strong>{calcTimeUntil(new Date(props.when), Date.now())}
            </p>
        </div>
    );
}

export default EventCard;