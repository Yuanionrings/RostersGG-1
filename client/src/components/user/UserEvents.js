import React, { Component } from "react";
import axios from 'axios';
import EventCard from "../events/EventCard";

class UserEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }



    componentDidMount() {
        console.log(this.props)
        // This is where route to get user events is implemented to fetch events
        axios.get("/api/users/" + this.props.username + "/upcoming-events")
            .then(res => {
                console.log(res);
                this.setState({
                    events: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    eventCards(){
        return this.state.events.map(function(event, i){
            return <EventCard name={event.name}
                    description={event.description}
                    when={event.when} 
                    key={i} />
        });
    }

    render() {
        return (
            <div className="display-box">
                <div>
                    <h2 className="">
                        Upcoming Events
                    </h2>
                    <hr />
                    {this.eventCards()}
                    <p className="filler-text">
                        NOT YET SUPPORTED<br />Each team will have "EVENTS" with a time and date. A user 
                        will see all of their upcoming events in chronological order here.
                    </p>
                </div>
            </div>
        )
    }
}

export default UserEvents;