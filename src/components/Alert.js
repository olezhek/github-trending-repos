import React from 'react'

const Alert = ({ message, handleDismiss }) => (
  <div className="alert alert-warning show" role="alert">
    {message}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleDismiss}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)

export default Alert