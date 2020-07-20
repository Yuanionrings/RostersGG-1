import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateRoster extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      username: this.props.auth.user.username,
      teamname: "",
      team_desc: ""
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    const newRoster = {
      teamname: this.state.teamname,
      team_desc: this.state.team_desc,
      username: this.state.username
    }
    console.log(newRoster);
    axios.post("http://localhost:5000/api/rosters/create", newRoster)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
  }

  render() {
    const { teamname, team_desc } = this.state;

    return (
      <div className="form-box ">
        <form className="signup-form" onSubmit={this.onSubmit}>

          <div>
              <Link to="/dashboard">
                <i className="fa fa-arrow-circle-left  "></i>
                Back to Dashboard
              </Link>
          </div>

          <h2>Create New Roster</h2>
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
            <input type="text"
              id="team_desc"
              placeholder="Description"
              value={team_desc}
              onChange={this.onChange}
              className={classnames("form-control")} />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block btn-lg">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

CreateRoster.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CreateRoster);