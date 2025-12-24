import { requestData } from '../utils'

export function fetchTrendingRepos() {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  const day = date.getDate()

  const dayFormatted = day < 10 ? `0${day}` : day
  const url = `https://api.github.com/search/repositories?q=created:>${date.getFullYear()}-${date.getMonth() + 1}-${dayFormatted}&sort=stars&order=desc`
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
  fetchTrendingRepos,
}
