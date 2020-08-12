import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import calcTimeUntil from '../../util/calcTimeUntil';
import dateFormat from 'dateformat';
import axios from 'axios';

function formatDateString(dateISO) {
    const date = new Date(dateISO);
    return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
};

const EventInfo = props => (
    <tr>
        <td className="">
            <Link to={"/" + props.event.name}>{props.event.name}</Link>
        </td>
        <td className="">{formatDateString(props.when)}</td>
        <td className="">{calcTimeUntil(new Date(props.event.when), Date.now())}</td>
        <td className="filler-text">[Not implemented]</td>
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
        console.log(this.props)

        axios.get('/api/rosters/roster/' + this.props.team_id + '/events')
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
        console.log(this.state.events)
        return this.state.events.map(function(currentEvent, i){
            return <EventInfo event={currentEvent} key={i} />
        });
    }
  
    render() {
        return (
            <div className="form-box">
                <div className="player-list">
                    <h2>Manage Team Events</h2>
                    <hr />
                    {(this.state.events.length > 0) ? 
                    <table className="table table-striped" style={{ marginTop: 15 }}>
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
                    :
                    <p className="filler-text">There are no events for this roster.</p>
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