import React from 'react';

function EventCard(props){
    console.log(props);
    return (
        <div className="event-card">
            <h4>{props.name}</h4>
            <p>{props.description}</p>
            <p>{props.when}</p>
            <hr />
            <p>Event starts in: </p>
            <p>Calculated time here</p>
        </div>
    );
}

export default EventCard;