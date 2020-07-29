import React, { Component } from "react";
import axios from 'axios';
import Button from "react-bootstrap/Button";

const InvitationInfo = props => (
    <tr>
        <td className="">{props.roster.teamname}</td>
        <td className="">{props.roster.team_desc}</td>
        <td className="">{props.roster.leader}</td>
        <td className="">{props.roster.players.length}</td>
        <td>
            <Button
                className="button-good" 
                onClick={() => onAccept(props.roster._id, props.username)}
                >Accept</Button>
            <Button
                className="button-bad"
                onClick={() => onDecline(props.roster._id, props.username)}
                >Decline</Button>
        </td>
    </tr>
);

function onAccept(team_id, given_username){
    axios.patch("http://localhost:5000/api/rosters/roster/" + team_id + "/accept-invite",
        {username: given_username})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    window.location.reload(false);
}

function onDecline(team_id, given_username){
    axios.patch("http://localhost:5000/api/rosters/roster/" + team_id + "/decline-invite",
        {username: given_username})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

    window.location.reload(false);
}


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_username: '',
            user_email: '',
            user_invitations: []
        }
    }

    onEdit = e => {
        e.preventDefault();
        this.props.history.push('/editprofile')
    }

    invitationList(user_username){
        return this.state.user_invitations.map(function(currentInvitation, i){
            return <InvitationInfo 
                    roster={currentInvitation} 
                    username={user_username} 
                    key={i} />
        });
    }

    componentDidMount() {
        console.log(this.props)
        axios.get("http://localhost:5000/api/users/" + this.props.given_username)
            .then(res => {
                this.setState({
                    user_name: res.data.name,
                    user_username: res.data.username,
                    user_email: res.data.email
                });
            })
            .catch(function (err) {
                console.log(err);

                // This seems like it's the only way to "log out" of session if user isn't found.
                localStorage.removeItem("jwtToken");
                window.location.reload(false);
            });

        axios.get("http://localhost:5000/api/users/" + this.props.given_username + "/invitations")
            .then(res => {
                this.setState({
                    user_invitations: res.data
                });
            })
            .catch(function (err) {
                console.log(err);
            });

        console.log(this.state)
    }

    render() {
        return (
            <div className="general-display-box">
                <div>
                    <h2 className="">
                        Welcome, <span className="highlight-text">{this.state.user_name}</span>!
                        <Button
                            onClick={this.onEdit}
                            className="float-right"
                            >Edit Profile</Button>
                    </h2>
                    <hr />

                    <h5>Invitations: </h5>
                    {(this.state.user_invitations.length > 0) ?
                        <table className="table table-striped" style={{ marginTop: 15 }}>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Description</th>
                                    <th>Leader</th>
                                    <th># Players</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.invitationList(this.state.user_username) }
                            </tbody>
                        </table>
                    :
                        <p><span className="secondary-text">There are no invitations.</span></p>
                    }
                </div>
            </div>
        )
    }
}

export default UserInfo;