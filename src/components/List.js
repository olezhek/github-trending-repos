import React, { useEffect, useReducer, useState } from 'react'
import { fetchUserStars, fetchTrendingRepos } from '../actions/repositories'
import { FILTER_TODOS, SET_REPOS, SET_STARS, TOGGLE_STAR, FILTER_BY_LANGUAGES } from '../constants/repositories'
import repositories, { initialState } from '../reducers/repositories'
import Alert from './Alert'
import FilteringButtons from './FilteringButtons'
import LanguageFilteringButtons from './LanguageFilteringButtons'
import ListItem from './ListItem'
import './List.css'

export default function List() {
  const [state, dispatch] = useReducer(repositories, initialState)
  const [showAlert, toggleAlert] = useState(false)

  useEffect(() => {
    fetchTrendingRepos()
      .then((payload) => {
        dispatch({ type: SET_REPOS, payload })
      })
      .catch(() => {
        toggleAlert(true)
      })

      const stars = fetchUserStars()
      dispatch({ type: SET_STARS, payload: stars })
  }, [])

  const toggleStar = (url) => (e) => {
    e.preventDefault()
    dispatch({ type: TOGGLE_STAR, payload: url })
  }

  const handleListFilter = (filter) => {
    dispatch({ type: FILTER_TODOS, payload: filter })
  }

  const handleLanguageFilter = (filter) => {
    dispatch({ type: FILTER_BY_LANGUAGES, payload: filter })
  }

  const filterByStarred = ({ html_url }) => (
    !state.filterBy || starred(html_url)
  )

  const filterByLanguage = ({ language }) => (
    !state.filterByLanguage || language === state.filterByLanguage
  )

  const starred = (url) => state.starred[url]

  const countStars = (url, stars) => (starred(url) ? ++stars : stars)

  const data = state.repos.filter(filterByLanguage).filter(filterByStarred)

  const languages = Object.keys(state.availableLanguages || {})

  return(
    <div className="container-fluid">
      {showAlert
        ? <Alert
            message="Unable to fetch data. Try again later"
          />
        : <>
            <div className="row">
              <div className="col mt-2">
                <FilteringButtons
                  handleListFilter={handleListFilter}
                  selectedFilter={state.filterBy} />
              </div>
            </div>
            <div className="row">
              <div className="col mt-2">
                <LanguageFilteringButtons
                  handleListFilter={handleLanguageFilter}
                  selectedFilter={state.filterByLanguage}
                  languages={languages} />
              </div>
            </div>
            <div className="row">
              <div className="col mt-4">
                {
                  data.length ?
                    data
                      .map(({ html_url, name, description, stargazers_count }) =>
                        <ListItem
                          key={html_url}
                          name={name}
                          description={description}
                          url={html_url}
                          stars={countStars(html_url, stargazers_count)}
                          starred={starred(html_url)}
                          toggleStar={toggleStar(html_url)}
                        />
                      )
                    : <div className="row"><div className="col text-center"><h6>No items found.</h6></div></div>
                }
              </div>
            </div>
          </>
      }
    </div>
  )
}