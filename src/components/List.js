import React, { useEffect, useReducer } from 'react'
import { fetchUserStars, fetchTrendingRepos } from '../actions/repositories'
import { FILTER_TODOS, SET_REPOS, SET_STARS, TOGGLE_STAR } from '../constants/repositories'
import repositories, { initialState } from '../reducers/repositories'
import FilteringButtons from './FilteringButtons'
import ListItem from './ListItem'
import './List.css'

export default function List() {
  const [state, dispatch] = useReducer(repositories, initialState)
  useEffect(() => {
    fetchTrendingRepos()
      .then((payload) => {
        dispatch({ type: SET_REPOS, payload })
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

  const filterItems = ({ html_url }) => (
    !state.filterBy || starred(html_url)
  )

  const starred = (url) => state.starred[url]

  const countStars = (url, stars) => (starred(url) ? ++stars : stars)

  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col mt-2">
          <FilteringButtons handleListFilter={handleListFilter} selectedFilter={state.filterBy} />
        </div>
      </div>
      <div className="row">
        <div className="col mt-4">
          {state.repos
            .filter(filterItems)
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
          }
        </div>
      </div>
    </div>
  )
}