import React, { useEffect, useReducer } from 'react'
import { fetchUserStars, fetchTrendingRepos } from '../actions/repositories'
import { SET_REPOS, SET_STARS, TOGGLE_STAR } from '../constants/repositories'
import repositories, { initialState } from '../reducers/repositories'
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

  const toggleStar = (url) => {
    dispatch({ type: TOGGLE_STAR, payload: url })
  }

  const starred = (url) => state.starred[url]

  const countStars = (url, stars) => (starred(url) ? ++stars : stars)

  return(
    <div className="col mt-2">
      {state.repos.map(({ html_url, name, description, stargazers_count }) =>
        <ListItem
          key={html_url}
          name={name}
          description={description}
          url={html_url}
          stars={countStars(html_url, stargazers_count)}
          starred={starred(html_url)}
          toggleStar={toggleStar}
        />
      )}
    </div>
  )
}