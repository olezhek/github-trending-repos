import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders App', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Trending GitHUB repos/i)
    expect(linkElement).toBeInTheDocument()
  })
})
