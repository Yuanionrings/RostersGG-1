import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const PlayerResultListing = props => (
    <tr>
        <td className=''>
            <Link to={`/user/${props.user.username}`}>{props.user.name}</Link>
        </td>
        <td className=''>{props.user.username}</td>
        <td className=''>{props.user.biography}</td>
    </tr>
);

class UserSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            name_search: '',
            players: [],
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

    onSubmitSearch = e => {
        e.preventDefault();
        
        const userSearchBody = {
            name_search: this.state.name_search
        }

        axios.post(`/api/users/user-search`, userSearchBody)
            .then(res => {
                this.setState({
                    players: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    playerResultsList(){
        return this.state.players.map(function(currentPlayer, i){
            return <PlayerResultListing user={currentPlayer} key={i} />
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
                        <div className='table-container'>

                            {(this.state.players.length === 1) ?
                                <p className='filler-text'>Found a player.</p>
                            :
                            <p className='filler-text'>Found {this.state.players.length} players.</p>
                            }

                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Biography</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.playerResultsList() }
                                </tbody>
                            </table>
                        </div>
                        :
                        <p className='filler-text'>Search for players with the search bar above.</p>
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