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
                    {this.state.events.length > 0 ?
                        this.eventCards()
                    :
                        <p className="filler-text">
                            You do not have any upcoming events.
                        </p>
                    }
                </div>
            </div>
        )
    }
}

export default UserEvents;