import React, { FC, LazyExoticComponent } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import {} from "antd";
interface IPrivateRouteProps {
  component: LazyExoticComponent<FC>;
  path: string;
  authRequired: Array<string>;
  whiteRoute: boolean;
  exact?: boolean;
  routes?: any;
}
const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  path,
  exact = false,
  whiteRoute,
  authRequired,
  routes,
}): React.JSX.Element => {
  // 检查用户是否已登录，这里做了简化处理，应根据实际项目需要进行实现
  const isLoggedIn = localStorage.getItem("token");
  // 当前用户是否有权限访问
  const userType = localStorage.getItem("userType");
  // 白名单路由不需要权限 authRequired 属性为 []
  const hasAuthRequired =
    authRequired?.includes(userType as string) || !authRequired;

  if (!isLoggedIn && !whiteRoute) {
    // 未登录且不为白名单路由
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Route
        path={path}
        exact={exact}
        render={(prop: RouteComponentProps) => {
          return hasAuthRequired || whiteRoute ? (
            // @ts-ignore
            <Component routes={routes} {...prop} />
          ) : (
            <Redirect path="*" to="/*" />
          );
        }}
      />
    </>
  );
};

export default PrivateRoute;
