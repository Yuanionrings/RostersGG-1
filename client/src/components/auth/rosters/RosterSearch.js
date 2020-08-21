import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RosterListingCard from './RosterListingCard';
import { supportedGamesList, supportedGames } from '../../../util/selectSupportedGames';
import { supportedRegionsList, supportedRegions } from '../../../util/selectSupportedRegions';


class RosterSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            roster_search: '',
            game: '',
            region: '',
            rosters: [],
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
        
        var rosterSearchBody;
        if (this.state.game === '' && this.state.region === '') {
            rosterSearchBody = {
                roster_search: this.state.roster_search
            }

        } else if (this.state.game !== '' && this.state.region === '') {
            rosterSearchBody = {
                roster_search: this.state.roster_search,
                game_search: this.state.game
            }

        } else if (this.state.game === '' && this.state.region !== '') {
            rosterSearchBody = {
                roster_search: this.state.roster_search,
                region_search: this.state.region
            }

        } else {
            rosterSearchBody = {
                roster_search: this.state.roster_search,
                game_search: this.state.game,
                region_search: this.state.region
            }
        }

        axios.post(`/api/rosters/roster-search`, rosterSearchBody)
            .then(res => {
                this.setState({
                    rosters: res.data
                });
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                });
            })
    }

    rosterResultsList(){
        return this.state.rosters.map(function(currentRoster, i){
            return <RosterListingCard roster={currentRoster} key={i} />
        });
    }

    render() {
        return (
            <div>
                <div className='form-box'>
                    <form className='signup-form' onSubmit={this.onSubmitSearch}>
                        <h3 className='mb-0'>Team Search</h3>
                        
                        <div className='form-group'>
                            <label>Team Name: </label>
                            <input type='text'
                                id='roster_search'
                                placeholder='Name to search for...'
                                value={this.state.roster_search}
                                error={this.state.errors.name}
                                onChange={this.onChange}
                                className={classnames('form-control', {
                                    invalid: this.state.errors.name
                                })} />
                            <span className='red-text'>{this.state.errors.name}</span>
                            <span className='red-text'>{this.state.errors.badrequest}</span>
                        </div>

                        <div className='form-group'>
                            <label className=''>Game: </label>
                            <select 
                            value={this.state.game} 
                            id='game'
                            error={this.state.errors.game}
                            onChange={this.onChange} 
                            className={classnames('form-control', {
                                invalid: this.state.errors.game
                            })}>
                            <option selected value=''>Any Game</option>
                            {supportedGamesList(supportedGames)}
                            </select>
                            <span className='red-text'>{this.state.errors.game}</span>
                        </div>

                        <div className='form-group'>
                            <label className=''>Region: </label>
                            <select 
                            value={this.state.region} 
                            id='region'
                            error={this.state.errors.region}
                            onChange={this.onChange} 
                            className={classnames('form-control', {
                                invalid: this.state.errors.region
                            })}>
                            <option selected value=''>Any Region</option>
                            {supportedRegionsList(supportedRegions)}
                            </select>
                            <span className='red-text'>{this.state.errors.region}</span>
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
                        <h3 className='mb-0'>Rosters</h3>

                        {(this.state.rosters.length > 0) ?
                        <div className=''>
                            <p className='mb-4 filler-text'>Found {this.state.rosters.length} teams. </p>
                            { this.rosterResultsList() }
                        </div>
                        :
                        <p className='filler-text'>Search for rosters with the search bar above.</p>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

RosterSearch.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps)(RosterSearch);