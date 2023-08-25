import React, { Suspense, LazyExoticComponent, FC } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom'
import { routes } from "./router"
import PrivateRoute from "./components/privateRoute"
import 'antd/dist/antd.min.css';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {
              routes.map((route, index) => {
                return (
                  <PrivateRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component as LazyExoticComponent<FC>}
                    subRoutes={route.children}
                  ></PrivateRoute>
                )
              })
            }
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
