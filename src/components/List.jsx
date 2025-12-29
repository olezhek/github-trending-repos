import { FILTER_TODOS, TOGGLE_STAR, FILTER_BY_LANGUAGES } from '../constants/repositories'
import ButtonGroup from './ButtonGroup'
import ListItem from './ListItem'
import './List.css'

export default function List({ items: state, dispatch }) {
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

  const filterByStarred = ({ html_url }) => !state.filterBy || starred(html_url)

  const filterByLanguage = ({ language }) => !state.filterByLanguage || language === state.filterByLanguage

  const starred = (url) => state.starred[url]

  const countStars = (url, stars) => (starred(url) ? ++stars : stars)

  const data = state.repos.filter(filterByLanguage).filter(filterByStarred)

  const languages = Object.keys(state.availableLanguages || {})

  const starredFilterButtons = ['Me']

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col mt-2">
          <ButtonGroup
            groupLabel={'Show repos starred by '}
            fallbackButtonLabel={'Everyone'}
            toggleFilter={handleListFilter}
            selectedFilter={state.filterBy}
            items={starredFilterButtons}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-2">
          <ButtonGroup
            groupLabel={'Show repos with code written in '}
            fallbackButtonLabel={'Display all'}
            toggleFilter={handleLanguageFilter}
            selectedFilter={state.filterByLanguage}
            items={languages}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-4">
          {data.length ? (
            data.map(({ html_url, name, description, stargazers_count }) => (
              <ListItem
                key={html_url}
                name={name}
                description={description}
                url={html_url}
                stars={countStars(html_url, stargazers_count)}
                starred={starred(html_url)}
                toggleStar={toggleStar(html_url)}
              />
            ))
          ) : (
            <div className="row">
              <div className="col text-center">
                <h6>No items found.</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
