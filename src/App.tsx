import React from 'react'
import { routes } from './router/routeLists'
import AppRouter from './router/AppRouter'
import AppRouter2 from './router/AppRouter2'

function App(): React.JSX.Element {
  return (
    <div className='App'>
      <AppRouter routes={routes}></AppRouter>
      {/* <AppRouter2 /> */}
    </div>
  )
}

export default App
