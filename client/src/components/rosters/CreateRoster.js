import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createRoster } from "../../actions/rosterAuthActions";

class CreateRoster extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      username: this.props.auth.user.username,
      teamname: "",
      team_desc: "",
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const newRoster = {
      teamname: this.state.teamname,
      team_desc: this.state.team_desc,
      username: this.state.username
    }
    
    this.props.createRoster(newRoster, this.props.history);
  }

  render() {
    const { teamname, team_desc, errors } = this.state;

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
            <button type="submit" className="btn btn-primary btn-block btn-lg">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

CreateRoster.propTypes = {
    createRoster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createRoster })(CreateRoster);