import React from 'react';

function EventCard(){
    console.log(this.props);
    return (
        <div className="event-card">
            <h4>{this.props.name}</h4>
            <p>{this.props.description}</p>
            <p>{this.props.when}</p>
            <hr />
            <p>Event starts in: </p>
            <p>Calculated time here</p>
        </div>
    );
}

export default EventCard;