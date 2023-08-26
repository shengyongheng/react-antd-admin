import { lazy } from "react"
const Layouts = lazy(() => import('../layout'))
const Login = lazy(() => import('../pages/login'))
const Home = lazy(() => import('../pages/home'))
const Admin = lazy(() => import('../pages/usersManagement/admin'))
const Vip = lazy(() => import('../pages/usersManagement/vip'))
const Demo = lazy(() => import('../pages/demoManagement/demo'))
const Icons = lazy(() => import('../pages/demoManagement/icons'))
const UseRef = lazy(() => import('../pages/demoManagement/useRef'))
const UseImperativeHandle = lazy(() => import('../pages/demoManagement/imperativeHandle'))
const Wines = lazy(() => import('../pages/ordersManagement/wines'))
const Fruit = lazy(() => import('../pages/ordersManagement/fruit'))
const CascaderDemo = lazy(() => import('../pages/antdComp/cascader'))
export const routes: Routes[] = [
    {
        path: '/login',
        component: Login,
        exact: true,
        meta: {
            title: '登录',
        }
    },
    {
        path: '/',
        component: Layouts,
        children: [
            {
                path: '/home',
                component: Home,
                meta: {
                    title: '首页',
                }
            },
            {
                path: '/users/admin',
                component: Admin,
                meta: {
                    title: '管理员列表',
                }
            },
            {
                path: '/users/vip',
                component: Vip,
                meta: {
                    title: 'VIP列表',
                }
            },
            {
                path: '/orders/wines',
                component: Wines,
                meta: {
                    title: '酒水管理',
                }
            },
            {
                path: '/orders/fruit',
                component: Fruit,
                meta: {
                    title: '水果管理',
                }
            },
            {
                path: '/demos/demo',
                component: Demo,
                meta: {
                    title: 'DEMO',
                }
            },
            {
                path: '/demos/icon',
                component: Icons,
                meta: {
                    title: 'DEMO',
                }
            },
            {
                path: '/demos/useref',
                component: UseRef,
                meta: {
                    title: 'useRef',
                }
            },
            {
                path: '/demos/imperativeHandle',
                component: UseImperativeHandle,
                meta: {
                    title: 'UseImperativeHandle',
                }
            },
            {
                path: '/antd/cascader',
                component: CascaderDemo,
                meta: {
                    title: '级联选择器',
                }
            },
        ]
    }
];