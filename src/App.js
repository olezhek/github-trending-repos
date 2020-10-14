import React from 'react'
import List from './components/List'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5"><h3>Trending GitHUB repos</h3></div>
      </div>
      <div className="row">
        <List />
      </div>
    </div>
  );
}

export default App
