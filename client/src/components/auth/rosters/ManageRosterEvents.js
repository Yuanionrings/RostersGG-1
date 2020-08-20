import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import calcTimeUntil from '../../../util/calcTimeUntil';
import dateFormat from 'dateformat';
import axios from 'axios';

function formatDateString(dateISO) {
    const date = new Date(dateISO);
    return dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
};

const EventInfo = props => (
    <tr>
        <td className=''>{props.event.name}</td>
        <td className=''>{formatDateString(props.event.when)}</td>
        <td className=''>{calcTimeUntil(new Date(props.event.when), Date.now())}</td>
        <td className='filler-text'>N/A</td>
    </tr>
);

class ManageRosterEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        axios.get(`/api/rosters/roster/${this.props.team_id}/events`)
            .then(res => {
                this.setState({
                    events: res.data
                });
            }).catch(err => {
                console.log(err);
            });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    rosterEventList(){
        return this.state.events.map(function(currentEvent, i){
            return <EventInfo event={currentEvent} key={i} />
        });
    }
  
    render() {
        return (
            <div className='form-box'>
                <div className='player-list'>
                    <h3>Manage Team Events</h3>
                    
                    {(this.state.events.length > 0) ? 
                    <div className='table-container'>
                        <table className='table table-striped' style={{ marginTop: 15 }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>When</th>
                                    <th>Time Until</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterEventList() }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text mb-4'>There are no events for this roster.</p>
                    }
                </div>
            </div>
        )
    }
}

ManageRosterEvents.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps)(ManageRosterEvents);