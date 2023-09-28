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
const AppleOrder = lazy(() => import('../pages/ordersManagement/fruit/pages/AppleOrder'))
const CascaderDemo = lazy(() => import('../pages/antdComp/cascader'))
const ErrorPage = lazy(() => import('../pages/errorPage'))
export const routes: Routes[] = [
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
                children: [
                    {
                        path: '/orders/fruit/watermelon',
                        component: '西瓜订单',
                        meta: {
                            title: '西瓜订单',
                            authRequired: ['users'],
                        }
                    },
                    {
                        path: '/orders/fruit/apple',
                        component: AppleOrder,
                        meta: {
                            title: '苹果订单',
                            authRequired: ['users'],
                        }
                    },
                ],
                meta: {
                    title: '水果管理',
                    authRequired: ['users'],
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
            {
                path: '/*',
                component: ErrorPage,
                meta: {
                    title: '404',
                    authRequired: ['users', 'admin']
                }
            }
        ],
        meta: {
            title: "系统",
            authRequired: ['users', 'admin']
        }
    }
];