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
                            {" "}To Dashboard
                        </Link>
                        <h3 className='mb-0'>{this.state.teamname}</h3>

                        {(this.props.auth.user.username === this.state.leader) ? 
                            <div>
                                <h6 className='mt-0 filler-text'>TEAM PROFILE: <Link to={`/roster/${this.props.match.params.id}/edit`}>Manage</Link></h6>
                                
                            </div>
                        :
                            <h6 className='mt-0 filler-text'>TEAM PROFILE</h6>
                        }
                        

                        <div className='roster-info'>
                            <h5>Game</h5>
                            <p>{this.state.game}</p>
                            
                            <h5 className='mt-2'>Region</h5>
                            <p>{this.state.region}</p>
                        </div>

                        <div className='roster-description'>
                            <h5>Description</h5>
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