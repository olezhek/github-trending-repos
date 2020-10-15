import React  from 'react'
import classnames from 'classnames'
import './FilteringButtons.css'

export default function FilteringButtons({ handleListFilter: toggleFilter, selectedFilter }) {
  return (
    <div className="d-flex align-items-center filtering-buttons">
      <h6 className="mb-0 mr-2">Show repos starred by </h6>
      <div className="btn-group" role="group">
        <button
          onClick={() => { toggleFilter('me') }}
          className={classnames('btn', { 'btn-outline-dark': selectedFilter !== 'me', 'btn-dark': selectedFilter === 'me' })}
          type="button">Me</button>
        <button
          onClick={() => { toggleFilter() }}
          className={classnames('btn', { 'btn-outline-dark': selectedFilter === 'me', 'btn-dark': !selectedFilter })}
          type="button">Everyone</button>
      </div>
    </div>
  )
}