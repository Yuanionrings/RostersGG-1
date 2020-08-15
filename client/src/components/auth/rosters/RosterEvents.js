import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import calcTimeUntil from '../../../util/calcTimeUntil';
import dateFormat from 'dateformat';

function formatDateString(dateISO) {
    const date = new Date(dateISO);
    return dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
};

const EventInfo = props => (
    <tr>
        <td className=''>{props.event.name}</td>
        <td className=''>{formatDateString(props.event.when)}</td>
        <td className=''>{calcTimeUntil(new Date(props.event.when), Date.now())}</td>
    </tr>
);

class RosterEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        axios.get(`/api/rosters/roster/${this.props.match.params.id}/players`)
            .then(res => {
                this.setState({
                    players: res.data
                });
            }).catch(err => {
                console.log(err);
            });
    }

    rosterEventList(){
        return this.state.events.map(function(currentEvent, i){
            return <EventInfo event={currentEvent} key={i} />
        });
    }

    render() {
        return (
            <div className='display-box'>
                <div className='box'>
    
                    <h5><b>Team Events</b></h5>
                    {(this.state.events.length > 0) ? 
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>When</th>
                                    <th>Time Until</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterEventList() }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text'>There are no events for this roster.</p>
                    }

                </div>
            </div>
        )
    }
}
export default RosterEvents;