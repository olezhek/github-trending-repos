import { useEffect, useReducer, useState } from 'react'
import Alert from './components/Alert'
import List from './components/List'
import { fetchTrendingRepos, fetchUserStars } from './actions/repositories'
import { SET_REPOS, SET_STARS } from './constants/repositories'
import repositories, { initialState } from './reducers/repositories'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
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

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <h3>Trending GitHUB repos</h3>
        </div>
      </div>
      {showAlert && <Alert message="Unable to fetch data. Try again later" />}
      {!!state.repos.length && (
        <div className="row">
          <List items={state} dispatch={dispatch} />
        </div>
      )}
    </div>
  )
}

export default App
