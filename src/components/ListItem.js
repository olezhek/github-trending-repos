import React from 'react'
import classnames from 'classnames'

export default function ListItem(props) {
  const { name, url, description, stars, toggleStar, starred } = props

  const toggleStarRepo = (repoUrl) => (e) => {
    e.preventDefault()
    toggleStar(repoUrl)
  }

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
          onClick={toggleStarRepo(url)}>{stars}</a>
      </div>
    </div>
  )
}