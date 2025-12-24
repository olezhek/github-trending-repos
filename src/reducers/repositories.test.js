import repositories from './repositories'
import { commitUserStars } from '../actions/repositories'
import { SET_REPOS, SET_STARS, TOGGLE_STAR } from '../constants/repositories'

jest.mock('../actions/repositories')
commitUserStars.mockImplementation(() => jest.fn())

describe('Repositories Reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should initialize repos' collection", () => {
    const initialState = {
      repos: [],
      starred: {}
    }

    const payload = { items: [{ name: 'test repo 1' }, { name: 'test repo 2' }] }

    const expected = {
      availableLanguages: {},
      repos: [{ name: 'test repo 1' }, { name: 'test repo 2' }],
      starred: {}
    }

    expect(repositories(initialState, { type: SET_REPOS, payload })).toEqual(expected)
  })

  it("should initialize starred repos' hash", () => {
    const initialState = {
      repos: [],
      starred: {}
    }

    const payload = {
      'http://example.com': true,
      'https://googol.com': false
    }

    const expected = {
      repos: [],
      starred: {
        'http://example.com': true,
        'https://googol.com': false
      }
    }

    expect(repositories(initialState, { type: SET_STARS, payload })).toEqual(expected)
  })

  it('should toggle starred state for an existing repo', () => {
    const initialState = {
      repos: [],
      starred: {
        'http://example.com': true
      }
    }

    expect(
      repositories(initialState, { type: TOGGLE_STAR, payload: 'http://example.com' })
        .starred['http://example.com']
    ).toBeFalsy()

    expect(commitUserStars).toHaveBeenCalledTimes(1)
  })

  it('should toggle starred state for a non-existent repo', () => {
    const initialState = {
      repos: [],
      starred: {
        'http://example.com': true
      }
    }

    const state = repositories(initialState, { type: TOGGLE_STAR, payload: 'http://CRAZY_NEW_NAME.com' })

    expect(state.starred['http://example.com']).toBe(true)
    expect(state.starred['http://CRAZY_NEW_NAME.com']).toBe(true)
    expect(commitUserStars).toHaveBeenCalledTimes(1)
  })
})
