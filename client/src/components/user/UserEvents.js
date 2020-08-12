import React, { Component } from "react";
import axios from 'axios';
import EventCard from "../events/EventCard";
import Slider from 'infinite-react-carousel';

class UserEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
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
        const sliderSettings = {
            adaptiveHeight: true,
            dots: true,
            swipe: false,
            initialSlide: 1,
            duration: 50
        }
        return (
            <div className="display-box">
                <div className="box">
                    <h2 className="">
                        Upcoming Events
                    </h2>
                    <hr />
                    {this.state.events.length > 0 ?
                        <Slider {...sliderSettings}>
                            {this.eventCards()}
                        </Slider>
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