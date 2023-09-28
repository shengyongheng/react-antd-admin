import React from 'react';
import { routes } from "./router/routeLists"
import AppRouter from './router/AppRouter';
import { Route } from "react-router-dom"
import Login from "./pages/login"

import 'antd/dist/antd.min.css';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <Route path='/login' component={Login}></Route>
      <AppRouter routes={routes}></AppRouter>
    </div>
  );
}

export default App;
