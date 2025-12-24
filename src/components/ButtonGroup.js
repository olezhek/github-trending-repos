import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './ButtonGroup.css'

function ButtonGroup({ groupLabel = 'Items: ', toggleFilter, selectedFilter, items = [], fallbackButtonLabel = 'Any' }) {
  return (
    <div className="d-flex justify-content-between align-items-center filtering-buttons">
      <h6 className="mb-0 mr-2">{groupLabel}</h6>
      <div className="btn-group" role="group">
        {items.map((lang) => (
          <button
            key={lang}
            onClick={() => {
              toggleFilter(lang)
            }}
            className={classnames('btn', { 'btn-outline-dark': selectedFilter !== lang, 'btn-dark': selectedFilter === lang })}
            type="button"
          >
            {lang}
          </button>
        ))}
        <button
          onClick={() => {
            toggleFilter()
          }}
          className={classnames('btn', { 'btn-outline-dark': selectedFilter, 'btn-dark': !selectedFilter })}
          type="button"
        >
          {fallbackButtonLabel}
        </button>
      </div>
    </div>
  )
}

ButtonGroup.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallbackButtonLabel: PropTypes.string
}

export default ButtonGroup
