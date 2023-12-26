// https://www.cnblogs.com/ZhiXing-Blogs/p/15524727.html
import React, { ReactElement, useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { } from 'antd'
interface IProps {
    routes: Routes[]
}
const AppRouter2 = ({ routes }: IProps): ReactElement => {
    //递归生成路由文件
    const generateRoute = (route: Routes) => {
        if (route.children) {
            if (route.component) {
                return (
                    <Route key={route.path} exact={route.exact} path={route.path} render={() => (
                        <route.component>
                            {
                                (route.children || []).map((item: Routes) => {
                                    return generateRoute(item)
                                })
                            }
                        </route.component>
                    )}>
                    </Route>
                )
            } else {
                return (
                    <Route key={route.path} exact={route.exact} render={() => (
                        (route.children || []).map((item) => {
                            return generateRoute(item)
                        })
                    )}>
                    </Route>
                )

            }
        }

        if (route.redirect) {
            return <Route exact={route.exact} key={route.path} path={route.path} render={
                () => (
                    <Redirect to={route.redirect} />)}>
            </Route>
        } else {
            return <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
        }
    }
    return (
        <Switch>
            {
                (routes || []).map((route: Routes) => {
                    return generateRoute(route)
                })
            }
        </Switch>
    )
}

export default withRouter(AppRouter2)