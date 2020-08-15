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
        console.log(this.props)

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
            <div className='display-box'>
                <div className='box'>
                    <Link to='/dashboard'>
                        <i className='fa fa-arrow-circle-left'></i>
                        {" "}Back to Dashboard
                    </Link>

                    <h3 className=''>{this.state.teamname}</h3>
                    <p>{this.state.game} | {this.state.region}</p>

                    <h5><b>Description:</b></h5>
                    <p>{this.state.team_desc}</p>
                    
                    <div className='table-container'>
                        <table className='table table-striped'>
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