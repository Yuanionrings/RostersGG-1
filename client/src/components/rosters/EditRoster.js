import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames"
import { editRoster } from "../../actions/rosterAuthActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EditRoster extends Component {
  constructor() {
    super()
    this.state = {
      teamname: "",
      team_desc: "",
      leader: "",
      players: [],
      errors: {}
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    const updatedRoster = {
        id: this.props.match.params.id,
        data: {
            teamname: this.state.teamname,
            team_desc: this.state.team_desc
        }
    };
    this.props.editRoster(updatedRoster, this.props.history);
}
  render() {
    const { teamname, team_desc, leader, errors } = this.state;
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
                        error={errors.teamname}
                        onChange={this.onChange}
                        className={classnames("form-control", {
                            invalid: errors.teamname
                        })} />
                </div>
                <span className="red-text">{errors.teamname}</span>

                <div className="form-group">
                    <label>Team Description: </label>
                    <input type="text"
                        id="team_desc"
                        placeholder="Description"
                        value={team_desc}
                        error={errors.team_desc}
                        onChange={this.onChange}
                        className={classnames("form-control", {
                            invalid: errors.team_desc
                        })} />
                </div>
                <span className="red-text">{errors.team_desc}</span>

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

EditRoster.propTypes = {
    editRoster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { editRoster })(EditRoster);