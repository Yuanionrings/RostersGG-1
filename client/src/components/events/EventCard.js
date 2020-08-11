import React from 'react';

function EventCard(props){
    //console.log(props);
    return (
        <div className="event-card">
            <h4>{props.name}</h4>
            <p>{props.description}</p>
            <p>{props.when} - this will be formatted better.</p>
            <hr />
            <p>Event starts in: (Not yet implemented)</p>
        </div>
    );
}

export default EventCard;