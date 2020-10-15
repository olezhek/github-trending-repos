import { cloneDeep } from 'lodash'
import { FILTER_TODOS, SET_REPOS, TOGGLE_STAR, SET_STARS } from '../constants/repositories'
import { commitUserStars } from '../actions/repositories'

export default function repositories(state, { type, payload }) {
  const newState = cloneDeep(state)

  switch(type) {
    case FILTER_TODOS:
      newState.filterBy = payload
      break
    case SET_REPOS:
      newState.repos = payload.items
      break
    case SET_STARS:
      newState.starred = payload
      break
    case TOGGLE_STAR:
      newState.starred[payload] = !newState.starred[payload]

      commitUserStars(newState.starred)
      break
  }

  return newState
}

export const initialState = {
  repos: [],
  filterBy: false,
  starred: {}
}
