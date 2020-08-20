import React, { Component } from 'react';
import DashHeader from '../auth/dashboard/DashHeader';
import DashFooter from '../auth/dashboard/DashFooter';


export default class NotFound extends Component {
    render() {
        return(
            <div className=''>
                <DashHeader />
                <div className='text-page-container not-found'>
                    <h1>404 Not Found</h1>
                    <p>Such a gamer moment! We could not find what you were looking for.</p>

                    <h5>Please go to <a href='https://www.rosters.gg'>Rosters.gg</a> to continue accessing the platform.</h5>
                    <p>If this error persists, shoot an email to contact@rosters.gg and a team member will reach out to you.</p>
                </div>
                <DashFooter />
            </div>
        );
    }
}