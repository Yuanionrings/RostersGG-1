import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRosterEvent } from '../../actions/rosterAuthActions';

class CreateEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event_name: '',
            event_when: '',
            team_id: this.props.team_id,
            errors: {}
        }
    }

    componentDidMount() {
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
        const newEventData = {
            team_id: this.state.team_id,
            data: {
                name: this.state.event_name,
                when: this.state.event_when,
                username: this.props.auth.user.username,
                team_id: this.state.team_id
            }
        };
        this.props.createRosterEvent(newEventData, this.props.history);
    }
  
  render() {
    const { event_name, event_when, errors } = this.state;
    return (
        <div className='form-box'>
            <form className='signup-form' onSubmit={this.onSubmit}>

                <h2>Create Event</h2>
                <p className='mb-0'>Date and time must be YYYY/MM/DD HH:MM:SS in order to process correctly.</p>
                <p className='filler-text mt-0'>All times must be entered as EST time (only during BETA).</p>
                <hr />
                
                <div className='form-group'>
                    <label>Event Name: </label>
                    <input type='text'
                        id='event_name'
                        placeholder='Event Name (Scrim, Practice, etc.)'
                        value={event_name}
                        error={errors.name}
                        onChange={this.onChange}
                        className={classnames('form-control', {
                            invalid: errors.name
                        })} />
                    <span className='red-text'>{errors.name}</span>
                </div>

                <div className='form-group'>
                    <label>Date and Time: </label>
                    <input type='text'
                        id='event_when'
                        placeholder='YYYY/MM/DD HH:MM:SS'
                        value={event_when}
                        error={errors.when}
                        onChange={this.onChange}
                        className={classnames('form-control', {
                            invalid: errors.when
                        })} />
                    <span className='red-text'>{errors.when}</span>
                </div>
                
                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-block btn-lg'>
                        Create Event
                    </button>
                </div>

            </form>
        </div>
    )
  }
}

CreateEvent.propTypes = {
    createRosterEvent: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { createRosterEvent })(CreateEvent);