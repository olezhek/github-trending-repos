import React from 'react'

const Alert = ({ message }) => (
  <div className="alert alert-warning show" role="alert">
    {message}
  </div>
)

export default Alert