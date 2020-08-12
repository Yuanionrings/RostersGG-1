import React from 'react';
import calcTimeUntil from '../../util/calcTimeUntil';

function EventCard(props){
    //console.log(props);
    return (
        <div className="event-card">
            <h4>{props.name}</h4>
            <p>{props.description}</p>
            <p>{props.when}</p>
            <hr />
            <p>Event starts in: <span className="filler-text">{calcTimeUntil(new Date(props.when), Date.now())}</span></p>
        </div>
    );
}

export default EventCard;