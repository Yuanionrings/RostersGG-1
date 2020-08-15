import React from 'react';

const DashTitle = props => {
    return (
        <div className='display-box'>
            <div className='title-box'>
                <h5 className=''>
                    {props.page_title}
                </h5>
            </div>
        </div>
    )
}

export default DashTitle;