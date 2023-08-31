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
            authRequired: ['users', 'admin'],
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
                    authRequired: ['users', 'admin'],
                }
            },
            {
                path: '/users/admin',
                component: Admin,
                meta: {
                    title: '管理员列表',
                    authRequired: ['admin'],
                }
            },
            {
                path: '/users/vip',
                component: Vip,
                meta: {
                    title: 'VIP列表',
                    authRequired: ['admin'],
                }
            },
            {
                path: '/orders/wines',
                component: Wines,
                meta: {
                    title: '酒水管理',
                    authRequired: ['users', 'admin'],
                }
            },
            {
                path: '/orders/fruit',
                component: Fruit,
                meta: {
                    title: '水果管理',
                    authRequired: ['admin'],
                }
            },
            {
                path: '/demos/demo',
                component: Demo,
                meta: {
                    title: 'DEMO',
                    authRequired: ['users', 'admin'],
                }
            },
            {
                path: '/demos/icon',
                component: Icons,
                meta: {
                    title: 'DEMO',
                    authRequired: ['users', 'admin'],
                }
            },
            {
                path: '/demos/useref',
                component: UseRef,
                meta: {
                    title: 'useRef',
                    authRequired: ['users', 'admin'],
                }
            },
            {
                path: '/demos/imperativeHandle',
                component: UseImperativeHandle,
                meta: {
                    title: 'UseImperativeHandle',
                    authRequired: ['users', 'admin'],
                }
            },
            {
                path: '/antd/cascader',
                component: CascaderDemo,
                meta: {
                    title: '级联选择器',
                    authRequired: ['users', 'admin'],
                }
            },
        ]
    }
];