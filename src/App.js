import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import Books from './Components/Books'

function App() {
  return (
    <div className='App'>
      <div className='small-screen-text d-flex-col text-center p-5'>
        <p>Browser window is too small</p>
        <p className='pt-4'>Please open on a desktop browser</p>
        <p className='pt-4'>
          {' '}
          If you are using a desktop browser, please resize your browser window
        </p>
      </div>
      <div className='database'>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            render={(routeProps) => <Books {...routeProps} />}
          />
          <Route
            exact
            path='/:num'
            render={(routeProps) => <Books {...routeProps} />}
          />
        </Switch>
      </div>
    </div>
  )
}

export default App
