import React, { Component } from "react";
import axios from "axios";

const PlayerInfo = props => (
    <tr>
        <td className="">{props.user.name}</td>
        <td className="">{props.user.username}</td>
        <td className="">{props.user.email}</td>
    </tr>
);

class ViewRoster extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('http://localhost:5000/api/rosters/roster/' + this.props.match.params.id + '/players')
            .then(res => {
                this.setState({
                    players: res.data
                });
            }).catch(function(err) {
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
            <div className="roster-display-box">
                <div>
                    <h2 className="">
                        Roster View
                    </h2>
                    
                    <table className="table table-striped" style={{ marginTop: 10 }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.playerList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ViewRoster;