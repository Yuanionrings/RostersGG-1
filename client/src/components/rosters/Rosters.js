import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Roster = props => (
    <tr>
        <td className="">{props.roster.roster_teamname}</td>
        <td className="">{props.roster.roster_leader}</td>
        <td className="">{props.roster.roster_captain}</td>
        <td className="">{props.roster.roster_players.length}</td>
        <td>
            <Link to={"/edit/"+props.roster._id}>Edit</Link>
        </td>
    </tr>
);

export default class Rosters extends Component {

    constructor(props){
        super(props);
        this.state = {
            rosters: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/rosters')
            .then(res => {
                this.setState({rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/rosters')
            .then(res => {
                this.setState({rosters: res.data});
            }).catch(function(err) {
                console.log(err);
            });
    }

    rosterList(){
        return this.state.rosters.map(function(currentRoster, i){
            return <Roster roster={currentRoster} key={i} />
        });
    }

    render() {
        return (
            <div>
                <h3 className="mt-4">List of Rosters</h3>
                <table className="table table-striped" style={{ marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Leader</th>
                            <th>Captain</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.rosterList() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Rosters;