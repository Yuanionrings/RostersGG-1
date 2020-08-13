import React from 'react';

export default function toastNotif(toastMessage) {
    return (
        <div className='toast-message'>
            {toastMessage}
        </div>
    )
}