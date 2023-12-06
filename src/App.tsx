import React from 'react'
import { routes } from './router/routeLists'
import AppRouter from './router/AppRouter'

function App (): React.JSX.Element {
  return (
    <div className='App'>
      <AppRouter routes={routes}></AppRouter>
    </div>
  )
}

export default App
