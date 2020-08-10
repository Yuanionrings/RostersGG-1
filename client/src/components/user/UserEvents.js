import React, { Component } from "react";
//import axios from 'axios';

class UserEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        // console.log(this.props)
        // This is where route to get user events is implemented to fetch events
    }
    render() {
        return (
            <div className="display-box">
                <div>
                    <h2 className="">
                        Upcoming Events
                    </h2>
                    <hr />
                    <p className="filler-text">
                        NOT YET SUPPORTED - Each team will have "EVENTS" with a time and date. A user 
                        will see all of their upcoming events in chronological order here.
                    </p>
                </div>
            </div>
        )
    }
}

export default UserEvents;