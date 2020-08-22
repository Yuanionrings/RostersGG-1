import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCorrectPath } from '../../../util/developmentHelper';

import UserListingCard from './UserListingCard';


class UserSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            name_search: '',
            players: [],
            errors: {}
        }
    }
    
    /*
    componentWillReceiveProps(nextProps) {
        console.log(`got errors: ${nextProps.errors}`)
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    */

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmitSearch = e => {
        e.preventDefault();
        
        const userSearchBody = {
            name_search: this.state.name_search
        }

        const userSearchRoute = getCorrectPath(`/api/users/user-search`);
        axios.post(userSearchRoute, userSearchBody)
            .then(res => {
                this.setState({
                    players: res.data
                });
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
            })
    }

    playerResultsList(){
        let auth_props = this.props.auth;
        let history_props = this.props.history;
        let roster_props = this.props.rosters;
        console.log(this.props)
        return this.state.players.map(function(currentPlayer, i){
            return <UserListingCard user={currentPlayer} 
                                    key={i}
                                    auth={auth_props}
                                    history={history_props} 
                                    rosters={roster_props} />
        });
    }

    render() {
        return (
            <div>
                <div className='form-box'>
                    <form className='signup-form' onSubmit={this.onSubmitSearch}>
                        <h3 className='mb-0'>Player Search</h3>
                        <p className='mt-0'>Enter the name of the player you are looking for.</p>
                        
                        <div className='form-group'>
                            <label>Player Name: </label>
                            <input type='text'
                                id='name_search'
                                placeholder='Name to search for...'
                                value={this.state.name_search}
                                error={this.state.errors.name}
                                onChange={this.onChange}
                                className={classnames('form-control', {
                                    invalid: this.state.errors.name
                                })} />
                            <span className='red-text'>{this.state.errors.name}</span>
                            <span className='red-text'>{this.state.errors.badrequest}</span>
                        </div>

                        <div className='form-group'>
                            <button type='submit' className='btn btn-primary btn-block btn-lg'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>


                <div className='display-box'>
                    <div className='box'>
                        <h3 className='mb-0'>Players</h3>

                        {(this.state.players.length > 0) ?
                        <div className=''>
                            <p className='mb-4 filler-text'>Found {this.state.players.length} player(s). </p>
                            { this.playerResultsList() }
                        </div>
                        :
                        <p className='filler-text'>Search for players with the search bar above. </p>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

UserSearch.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps)(UserSearch);