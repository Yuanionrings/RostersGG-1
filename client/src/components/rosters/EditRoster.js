import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames"
import { editRoster } from "../../actions/rosterAuthActions";
import { logoutUser } from "../../actions/userAuthActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InvitePlayer from "./InvitePlayer";

class EditRoster extends Component {
    constructor() {
        super()
        this.state = {
            teamname: "",
            team_desc: "",
            game: "",
            region: "",
            leader: "",
            players: [],
            errors: {}
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/api/rosters/roster/" + this.props.match.params.id)
            .then(res => {
                if(this.props.auth.user.username === res.data.leader){
                    this.setState({
                        teamname: res.data.teamname,
                        team_desc: res.data.team_desc,
                        game: res.data.game,
                        region: res.data.region,
                        leader: res.data.leader,
                        players: res.data.players
                    })
                } else {
                    this.props.logoutUser();
                }
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
                team_desc: this.state.team_desc,
                game: this.state.game,
                region: this.state.region
            }
        };
        this.props.editRoster(updatedRoster, this.props.history);
    }
  
  render() {
    const { teamname, team_desc, leader, errors } = this.state;
    return (
        <div>
            <div className="form-box ">
                <form className="signup-form" onSubmit={this.onSubmit}>
                    <div>
                        <Link to="/dashboard">
                            <i className="fa fa-arrow-circle-left  "></i>
                            {" "}Back to Dashboard
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
                        <label>Change Game Played: </label>
                        <select 
                        value={this.state.game} 
                        id="game" 
                        error={errors.game}
                        onChange={this.onChange} 
                        className={classnames("form-control", {
                            invalid: errors.game
                        })}>
                        <option selected value="no-game">Select a game:</option>
                        <option value="mordhau">MORDHAU</option>
                        <option value="cs-go">CS:GO</option>
                        <option value="league-of-legends">League of Legends</option>
                        <option value="dota-2">Dota 2</option>
                        <option value="valorant">Valorant</option>
                        <option value="overwatch">Overwatch</option>
                        <option value="chivalry">Chivalry</option>
                        </select>
                        <span className="red-text">{errors.game}</span>
                    </div>

                    <div className="form-group">
                        <label>Change Primary Region: </label>
                        <select 
                        value={this.state.region} 
                        id="region" 
                        error={errors.region}
                        onChange={this.onChange} 
                        className={classnames("form-control", {
                            invalid: errors.region
                        })}>
                        <option selected value="no-region">Select a region:</option>
                        <option value="US-EAST">US-EAST</option>
                        <option value="US-CENTRAL">US-CENTRAL</option>
                        <option value="US-MOUNTAIN">US-MOUNTAIN</option>
                        <option value="US-PACIFIC">US-PACIFIC</option>
                        <option value="EUR-WEST">EUR-WEST</option>
                        <option value="EUR-EAST">EUR-EST</option>
                        <option value="ASIA">ASIA</option>
                        </select>
                        <span className="red-text">{errors.region}</span>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            Submit Changes
                        </button>
                    </div>

                </form>
            </div>
            
            <InvitePlayer 
                auth={this.props.auth} 
                history={this.props.history} 
                team_id={this.props.match.params.id} />
            <div className="filler-lg"></div>
        </div>
    )
  }
}

EditRoster.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    editRoster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { editRoster, logoutUser })(EditRoster);