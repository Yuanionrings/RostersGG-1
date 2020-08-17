import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RosterInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/roster/${props.roster._id}`}>{props.roster.teamname}</Link>
        </td>
        <td className=''>{props.roster.game}</td>
        <td className=''>{props.roster.region}</td>
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
        axios.get(`/api/rosters/${this.state.username}/rosters`)
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
            <div className='display-box'>
                <div className='box'>
                    <h3>Rosters</h3>

                    {(this.state.rosters.length > 0) ?
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Game</th>
                                    <th>Region</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterList() }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text'>You are not a player on any roster.</p>
                    }

                </div>
            </div>
        );
    }
}