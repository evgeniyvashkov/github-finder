import React from 'react'

import spinnerUrl from '../Layout/spinner.gif'

const Spinner = () =>
    <div className='spinner'>
        <img src={spinnerUrl} alt='loading...' style={spinnerStyle} />
    </div>



const spinnerStyle = {
    display: 'flex',
    width: "200px",
    margin: "auto",
}

export default Spinner;
