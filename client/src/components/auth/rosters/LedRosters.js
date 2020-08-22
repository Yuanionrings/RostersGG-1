import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getCorrectPath } from '../../../util/developmentHelper';

const RosterInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/roster/${props.roster._id}`}>{props.roster.teamname}</Link>
        </td>
        <td className=''>{props.roster.game}</td>
        <td className=''>{props.roster.region}</td>
        <td>
            <Link to={`/roster/${props.roster._id}/edit`}>Manage</Link>
        </td>
    </tr>
);

export default class LedRosters extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            rosters: []
        }
    }

    componentDidMount() {
        const getLedRostersRoute = getCorrectPath(`/api/rosters/${this.state.username}/led-rosters`);
        axios.get(getLedRostersRoute)
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

    onCreate = e => {
        e.preventDefault();
        this.props.history.push('/roster/create')
    }

    render() {
        return (
            <div className='display-box'>
                <div className='box'>
                    <h3 className=''>
                        My Rosters
                        <Button
                          className='float-right'
                          onClick={this.onCreate}
                        >Create</Button>
                    </h3>
                    

                    {(this.state.rosters.length > 0) ?
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Game</th>
                                    <th>Region</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterList() }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p className='filler-text'>You do not lead any rosters.</p>
                    }

                </div>
            </div>
        );
    }
}