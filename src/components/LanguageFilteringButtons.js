import React  from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './FilteringButtons.css'

function LanguageFilteringButtons({ handleListFilter: toggleFilter, selectedFilter, languages = [] }) {
  return (
    <div className="d-flex align-items-center filtering-buttons">
      <h6 className="mb-0 mr-2">Show repos starred by </h6>
      <div className="btn-group" role="group">
        {
          languages.map((lang) => (
            <button
              key={lang}
              onClick={() => { toggleFilter(lang) }}
              className={classnames('btn', { 'btn-outline-dark': selectedFilter !== lang, 'btn-dark': selectedFilter === lang })}
              type="button">{lang}</button>
          ))
        }
        <button
          onClick={() => { toggleFilter() }}
          className={classnames('btn', { 'btn-outline-dark': selectedFilter === 'me', 'btn-dark': !selectedFilter })}
          type="button">Everyone</button>
      </div>
    </div>
  )
}

LanguageFilteringButtons.propTypes = {
  handleListFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
  languages: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default LanguageFilteringButtons