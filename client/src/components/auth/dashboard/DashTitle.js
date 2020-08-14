import React from 'react';

const DashTitle = props => {
    return (
        <div className='display-box'>
            <div className='title-box'>
                <h2 className=''>
                    {props.page_title}
                </h2>
            </div>
        </div>
    )
}

export default DashTitle;