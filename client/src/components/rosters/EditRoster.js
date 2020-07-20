import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames"

class EditRoster extends Component {
  constructor() {
    super()
    this.state = {
      teamname: "",
      team_desc: "",
      leader: "",
      players: []
    }
  }
  componentDidMount() {
    console.log(this.props.match)
    console.log(this.props)
    axios.get("http://localhost:5000/api/rosters/roster/" + this.props.match.params.id)
        .then(res => {
            this.setState({
                teamname: res.data.teamname,
                team_desc: res.data.team_desc,
                leader: res.data.leader,
                players: res.data.players
            })
        })
        .catch(err => {
            console.log(err);
        })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    const updatedRoster = {
        teamname: this.state.teamname,
        team_desc: this.state.team_desc
    };
    axios.post("http://localhost:5000/api/rosters/roster/" + this.props.match.params.id + "/edit", updatedRoster)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    this.props.history.push("/dashboard");
}
  render() {
    const { teamname, team_desc, leader } = this.state;
    return (
        <div className="form-box ">
            <form className="signup-form" onSubmit={this.onSubmit}>
                <div>
                    <Link to="/dashboard">
                        <i className="fa fa-arrow-circle-left  "></i>
                        Back to Dashboard
                    </Link>
                </div>

                <h2>Edit Roster</h2>
                <hr />
                <div className="form-group">
                    <label>Team Name: </label>
                    <input type="text"
                        id="teamname"
                        placeholder="Team Name"
                        value={teamname}
                        onChange={this.onChange}
                        className={classnames("form-control")} />
                </div>

                <div className="form-group">
                    <label>Team Description: </label>
                    <input type="textarea"
                        id="team_desc"
                        placeholder="Description"
                        value={team_desc}
                        onChange={this.onChange}
                        className={classnames("form-control")} />
                </div>

                <div className="form-group">
                    <label>Leader: </label>
                    <input type="text"
                        id="leader"
                        placeholder="Leader"
                        value={leader}
                        readOnly={true}
                        className={classnames("form-control")} />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">
                        Submit Changes
                    </button>
                </div>

            </form>
        </div>
    )
  }
}

export default EditRoster;