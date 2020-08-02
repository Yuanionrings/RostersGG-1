import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RosterInfo = props => (
    <tr>
        <td className="">{props.roster.teamname}</td>
        <td className="">{props.roster.game}</td>
        <td className="">{props.roster.region}</td>
        <td className="">{props.roster.players.length}</td>
        <td>
            <Link to={"/roster/" + props.roster._id}>View</Link>
        </td>
    </tr>
);

export default class MyRosters extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            rosters: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/rosters/' + this.state.username + '/rosters')
            .then(res => {
                this.setState({
                    username: this.state.username,
                    rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/api/rosters/' + this.state.username + '/rosters')
            .then(res => {
                this.setState({
                    username: this.state.username,
                    rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    rosterList(){
        return this.state.rosters.map(function(currentRoster, i){
            return <RosterInfo roster={currentRoster} key={i} />
        });
    }

    render() {
        return (
            <div className="display-box">
                <div>
                    <h2 className="">
                        Rosters
                    </h2>
                    <hr />

                    {(this.state.rosters.length > 0) ?
                    <table className="table table-striped" style={{ marginTop: 15 }}>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Game</th>
                                <th>Region</th>
                                <th># Players</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.rosterList() }
                        </tbody>
                    </table>
                    :
                    <p><span className="filler-text">You are not a part of any rosters.</span></p>
                    }

                </div>
            </div>
        );
    }
}