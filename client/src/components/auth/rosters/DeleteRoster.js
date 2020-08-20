import React, { Component } from 'react';
import { deleteRoster } from '../../../actions/rosterAuthActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DeleteRoster extends Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
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
            <div className='form-box'>
                <form className='signup-form' onSubmit={this.onSubmit}>

                    <h3>Delete Roster - {this.props.teamname}</h3>

                    <div className='form-group'>
                        <label>Warning, you cannot save this roster once it is deleted.</label>
                        <button type='submit' className='btn btn-delete btn-block btn-lg'>
                            Delete Roster
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
  }
}

DeleteRoster.propTypes = {
    deleteRoster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { deleteRoster })(DeleteRoster);