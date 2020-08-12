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
            <p className="filler-text"><strong>Time until event:</strong>: {calcTimeUntil(new Date(props.when), Date.now())}</p>
        </div>
    );
}

export default EventCard;