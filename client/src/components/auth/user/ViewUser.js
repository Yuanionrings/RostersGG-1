import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RosterInfo = props => (
    <tr>
        <td className=''>{props.roster.teamname}</td>
        <td className=''>{props.roster.game}</td>
        <td className=''>{props.roster.region}</td>
        <td className=''>{props.roster.players.length}</td>
        <td>
            <Link to={`/roster/${props.roster._id}`}>View</Link>
        </td>
    </tr>
);

export default class ViewUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            biography: '',
            date: '',
            rosters: []
        }
    }

    componentDidMount() {
        axios.get(`/api/rosters/${this.props.match.params.username}/rosters`)
            .then(res => {
                this.setState({ rosters: res.data });
            }).catch(function(err) {
                console.log(err);
            });

        axios.get(`/api/users/${this.props.match.params.username}`)
            .then(res => {
                this.setState({ name: res.data.name,
                                username: res.data.username,
                                biography: res.data.biography,
                                date: res.data.date});
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
                    <div>
                        <Link to='/dashboard'>
                            <i className='fa fa-arrow-circle-left'></i>
                            {" "}To Dashboard
                        </Link>
                    </div>

                    <h3 className=''>{this.state.name}</h3>
                    <h6 className='filler-text'>USER PROFILE</h6>

                    <h5>User Info </h5>
                    <p>Username: {this.state.username}</p>
                    <p>Member since: {this.state.date}</p>

                    <h5>About Me </h5>
                    <p className='filler-text'>{this.state.biography}</p>

                    <h5>Rosters</h5>
                    {(this.state.rosters.length > 0) ?
                    <div className='table-container'>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Game</th>
                                    <th>Region</th>
                                    <th>Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.rosterList() }
                            </tbody>
                        </table>
                    </div>
                    :
                    <p><span className='filler-text'>This user is not a part of any rosters.</span></p>
                    }

                </div>
            </div>
        );
    }
}