import React, { FC, Suspense, LazyExoticComponent } from 'react';
import { Switch, Redirect } from 'react-router-dom'
import PrivateRoute from "../../components/privateRoute"
import { } from 'antd'
interface IProps {
    subRoutes: any
}
const Main: FC<IProps> = ({ subRoutes }): React.JSX.Element => {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    {
                        subRoutes.map((route: any, index: number) => {
                            return (
                                <PrivateRoute
                                    key={index}
                                    path={route.path}
                                    component={route.component as LazyExoticComponent<FC>}
                                    subRoutes={route.children}
                                ></PrivateRoute>
                            )
                        })
                    }
                    <Redirect to="/home" />
                </Switch>
            </Suspense>
        </>
    )
}

export default Main