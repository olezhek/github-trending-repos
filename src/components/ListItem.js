import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function ListItem(props) {
  const { name, url, description, stars, toggleStar, starred } = props

  return (
    <div className="row d-flex justify-content-between align-items-center">
      <div className="col-6">
        <a rel="noopener noreferrer" target="_blank" href={url}>{name}</a>
        <p className="text-muted">{description}</p>
      </div>
      <div className="col-1">
        <a
          href="#"
          className={classnames('badge', 'stargazers', { 'badge-light': !starred, 'badge-dark': starred })}
          onClick={toggleStar}>{stars}</a>
      </div>
    </div>
  )
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  stars: PropTypes.number.isRequired,
  toggleStar: PropTypes.func.isRequired,
  starred: PropTypes.bool
}

export default ListItem