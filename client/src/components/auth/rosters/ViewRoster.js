import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import RosterPlayers from './RosterPlayers';
import RosterEvents from './RosterEvents';

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
                    region: res.data.region,
                    players: res.data.players
                })
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>

                <div className='display-box'>
                    <div className='box'>

                        <Link to='/dashboard'>
                            <i className='fa fa-arrow-circle-left'></i>
                            {" "}Back to Dashboard
                        </Link>

                        <h3 className=''>{this.state.teamname}</h3>

                        <div className='roster-info'>
                            <p><b>Game -</b> {this.state.game}</p>
                            <p><b>Region -</b> {this.state.region}</p>
                            <p><b>Number of Players -</b> {this.state.players.length}</p>
                        </div>

                        <div className='roster-description'>
                            <h5><b>Description</b></h5>
                            <p>{this.state.team_desc}</p>
                        </div>

                    </div>
                </div>

                <RosterPlayers match={this.props.match} />
                <RosterEvents match={this.props.match} />

            </div>
        )
    }
}
export default ViewRoster;