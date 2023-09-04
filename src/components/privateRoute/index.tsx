import React, { FC, LazyExoticComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { } from 'antd'
interface IProps {
    component: LazyExoticComponent<FC>,
    path: string
    authRequired: Array<string>
    exact?: boolean
    routes?: any
}
const PrivateRoute: FC<IProps> = ({ component: Component, path, exact = false, authRequired, routes }): React.JSX.Element => {
    // 检查用户是否已登录，这里做了简化处理，应根据实际项目需要进行实现
    const isLoggedIn = localStorage.getItem("token");
    // 当前用户是否有权限访问
    const userType = localStorage.getItem("userType");
    const hasAuthRequired = authRequired.includes(userType as string)
    return (
        <>
            <Route path={path} exact={exact} render={(props: any) => (
                !isLoggedIn
                    ? hasAuthRequired ? <Component {...props} routes={routes} /> :
                        <Redirect to='*' />
                    : <Redirect to='/login' />
            )} />
        </>
    )
}

export default PrivateRoute