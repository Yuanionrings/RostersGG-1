import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return(
            <div className='text-page-container'>
                <h2>404 Not Found</h2>
                <p>Sorry about that! We could not find what you were looking for.</p>

                <h3>Please go to <a href='https://www.rosters.gg'>Rosters.gg</a> to continue accessing the platform.</h3>
                <h4>If this error persists, shoot an email to contact@rosters.gg and a team member will reach out to you.</h4>
            </div>
        );
    }
}