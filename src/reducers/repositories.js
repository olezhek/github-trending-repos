import cloneDeep from 'lodash.clonedeep'
import { FILTER_TODOS, SET_REPOS, TOGGLE_STAR, SET_STARS, FILTER_BY_LANGUAGES } from '../constants/repositories'
import { commitUserStars } from '../actions/repositories'

export default function repositories(state, { type, payload }) {
  const newState = cloneDeep(state)

  switch (type) {
    case FILTER_TODOS:
      newState.filterBy = payload
      break
    case SET_REPOS:
      newState.repos = payload.items
      newState.availableLanguages = payload.items.reduce((collection, { language }) => {
        if (language) {
          collection[language] = true
        }

        return collection
      }, {})
      break
    case SET_STARS:
      newState.starred = payload
      break
    case TOGGLE_STAR:
      if (newState.starred[payload]) {
        delete newState.starred[payload]
      } else {
        newState.starred[payload] = true
      }

      commitUserStars(newState.starred)
      break
    case FILTER_BY_LANGUAGES:
      newState.filterByLanguage = payload
  }

  return newState
}

export const initialState = { availableLanguages: {}, repos: [], filterBy: false, filterByLanguage: false, starred: {} }
