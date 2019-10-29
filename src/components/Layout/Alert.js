import React from 'react'

const Alert = ({ alert: { message, type } }) =>
    <div className={`alert alert-${type}`}>
        <i className="fas fa-info-circle"></i> {message}
    </div>

export default Alert;
