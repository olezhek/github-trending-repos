export default function requestData(from, method, body) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const r = new Request(from, {
    method,
    headers,
    body: JSON.stringify(body)
  })

  return fetch(r).then((res) => res.json())
}
