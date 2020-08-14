import React from 'react';

const DashTitle = props => {
    return (
        <div className='display-box'>
            <div className='box'>
                <h2 className=''>
                    {props.page-title}
                </h2>
            </div>
        </div>
    )
}

export default DashTitle;