import React, { FC, LazyExoticComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { } from 'antd'
interface IProps {
    component: LazyExoticComponent<FC>,
    path: string
    exact?: boolean
    routes?: any
}
const PrivateRoute: FC<IProps> = ({ component: Component, path, exact = false, routes }): React.JSX.Element => {
    // 检查用户是否已登录，这里做了简化处理，应根据实际项目需要进行实现
    const isLoggedIn = localStorage.getItem("token");
    return (
        <>
            <Route path={path} exact={exact} render={(props: any) => (
                !isLoggedIn
                    ? <Component {...props} routes={routes} />
                    : <Redirect to='/login' />
            )} />
        </>
    )
}

export default PrivateRoute