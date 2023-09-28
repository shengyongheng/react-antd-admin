import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../components/privateRoute';

function AppRouter(props: { routes: Routes[] }) {
    const { routes } = props;
    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <Switch>
                {routes.map((route: Routes, index: number) => {
                    return (
                        <PrivateRoute
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                            routes={route.children}
                            authRequired={route?.meta?.authRequired as string[]}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    );
}
export default AppRouter;
