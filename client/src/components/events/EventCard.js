import React from 'react';
import calcTimeUntil from '../../util/calcTimeUntil';
import { formatDateString } from '../../util/formatDateString';

function EventCard(props){
    return (
        <div className='event-card'>
            <h4 className='mb-0'>{props.name}</h4>
            <p className='mt-0 mb-0'>{props.description}</p>
            <p className='mt-0 mb-1'>Associated Teams: <span className='filler-text'>{props.team_names}</span></p>
            <p className='mt-2 filler-text'>{formatDateString(props.when)}</p>
            <hr />
            <p className='filler-text'>
                <strong>Time until event: </strong>{calcTimeUntil(new Date(props.when), Date.now())}
            </p>
        </div>
    );
}

export default EventCard;