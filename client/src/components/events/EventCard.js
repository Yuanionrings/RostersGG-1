import React from 'react';
import calcTimeUntil from '../../util/calcTimeUntil';
import dateFormat from 'dateformat';

function EventCard(props){
    formatDateString = () => {
        const date = new Date(props.when);
        return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    };
    return (
        <div className="event-card">
            <h4>{props.name}</h4>
            <p className="mb-0">{props.description}</p>
            <p className="mt-0 filler-text">{formatDateString()}</p>
            <hr />
            <p className="filler-text">
                <strong>Time until event: </strong>{calcTimeUntil(new Date(props.when), Date.now())}
            </p>
        </div>
    );
}

export default EventCard;