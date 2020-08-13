import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDateString } from '../../../util/formatDateString';

const PlayerInfo = props => (
    <tr>
        <td className=''>
            <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
        </td>
        <td className=''>{props.user.username}</td>
        <td className=''>{formatDateString(props.user.date)}</td>
    </tr>
);

class ViewRoster extends Component {
    constructor(props){
        super(props);
        this.state = {
            teamname: '',
            team_desc: '',
            leader: '',
            game: '',
            region: '',
            players: []
        }
    }
    componentDidMount() {
        axios.get(`/api/rosters/roster/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    teamname: res.data.teamname,
                    team_desc: res.data.team_desc,
                    leader: res.data.leader,
                    game: res.data.game,
                    region: res.data.region
                })
            }).catch(err => {
                console.log(err);
            })

        axios.get(`/api/rosters/roster/${this.props.match.params.id}/players`)
            .then(res => {
                this.setState({
                    players: res.data
                });
            }).catch(err => {
                console.log(err);
            });
    }

    playerList(){
        return this.state.players.map(function(currentPlayer, i){
            return <PlayerInfo user={currentPlayer} key={i} />
        });
    }

    render() {
        return (
            <div className='viewing-display-box'>
                <div className='display-content'>
                    <Link to='/dashboard'>
                        <i className='fa fa-arrow-circle-left'></i>
                        {" "}Back to Dashboard
                    </Link>

                    <h2 className=''>{this.state.teamname}</h2>
                    <h6>{this.state.game} - {this.state.region}</h6>
                    <hr />

                    <h6><b>Description:</b><br/>{this.state.team_desc}</h6>
                    
                    <div className='table-container'>
                        <table className='table table-striped' style={{ marginTop: 15 }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Date Joined RostersGG</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.playerList() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewRoster;