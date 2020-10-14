import { requestData } from '../utils'

export function fetchTrendingRepos() {
  const url = 'https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc'
  return requestData(url, 'get')
}

export function fetchUserStars() {
  return JSON.parse(window.localStorage.getItem('starred_repos')) || {}
}

export function commitUserStars(data) {
  window.localStorage.setItem('starred_repos', JSON.stringify(data))
}

export default {
  commitUserStars,
  fetchUserStars,
  fetchTrendingRepos
}