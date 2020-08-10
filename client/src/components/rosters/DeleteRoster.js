import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteRoster } from "../../actions/rosterAuthActions";
import { logoutUser } from "../../actions/userAuthActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DeleteRoster extends Component {
    constructor() {
        super()
        this.state = {
            teamname: "",
            free_to_delete: false,
            errors: {}
        }
    }

    componentDidMount() {
        axios.get("/api/rosters/roster/" + this.props.match.params.id)
            .then(res => {
                if(this.props.auth.user.username === res.data.leader){
                    this.setState({
                        teamname: res.data.teamname,
                        free_to_delete: true
                    });
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
        const deleteRosterData = {
            id: this.props.match.params.id,
            username: this.props.auth.user.username
        };
        this.props.deleteRoster(deleteRosterData, this.props.history);
    }
  
  render() {
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

                    <h2>Delete Roster - {this.state.teamname}</h2>
                    <hr />

                    <div className="form-group">
                        <label>Warning, you cannot save this roster once it is deleted.</label>
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            Delete Roster Forever
                        </button>
                        {/*<span className="red-text">{this.errors.delete}</span>*/}
                    </div>

                </form>
            </div>
        </div>
    )
  }
}

DeleteRoster.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    deleteRoster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { deleteRoster, logoutUser })(DeleteRoster);