import { lazy } from 'react'
const Layouts = lazy(() => import('../layout'))
const Login = lazy(() => import('../pages/login'))
const Profile = lazy(() => import('../pages/profile'))
const Home = lazy(() => import('../pages/home'))
const Admin = lazy(() => import('../pages/usersManagement/admin'))
const Vip = lazy(() => import('../pages/usersManagement/vip'))
const Demo = lazy(() => import('../pages/demoManagement/demo'))
const Icons = lazy(() => import('../pages/demoManagement/icons'))
const Mitt = lazy(() => import('../pages/demoManagement/mitt'))
const UseRef = lazy(() => import('../pages/demoManagement/useRef'))
const UseImperativeHandle = lazy(
    () => import('../pages/demoManagement/imperativeHandle')
)
const ScreenLists = lazy(() => import('../pages/dataScreen/screenLists'))
const Wines = lazy(() => import('../pages/ordersManagement/wines'))
const Fruit = lazy(() => import('../pages/ordersManagement/fruit'))
const WatermelonOrder = lazy(
    () => import('../pages/ordersManagement/fruit/pages/WatermelonOrder')
)
const AppleOrder = lazy(
    () => import('../pages/ordersManagement/fruit/pages/appleOrder')
)
const AppleOrderDetail = lazy(() => import('../pages/ordersManagement/fruit/pages/appleOrder/components/appleOrderDetail/index'))
const CascaderDemo = lazy(() => import('../pages/antdComp/cascader'))
const TableDemo = lazy(() => import('../pages/antdComp/table'))
const TableDetail = lazy(() => import('../pages/antdComp/table/components/tableDetail/index'))
const ErrorPage = lazy(() => import('../pages/errorPage'))
export const routes: Routes[] = [
    {
        path: '/login',
        component: Login,
        exact: true,
        whiteRoute: true,
        meta: {
            title: '登录',
        }
    },
    {
        path: '/profile',
        component: Profile,
        exact: true,
        whiteRoute: false,
        meta: {
            title: '个人信息',
        }
    },
    {
        path: '/',
        component: Layouts,
        // exact: true,
        redirect: '/home',
        whiteRoute: false,
        children: [
            // 首页
            {
                path: '/home',
                component: Home,
                whiteRoute: false,
                meta: {
                    title: '首页',
                    authRequired: ['users', 'admin']
                }
            },
            // 订单管理
            // {
            //     path: '/orders',
            //     whiteRoute: false,
            //     redirect: '/orders/wines',
            //     children: [
            //         {
            //             path: '/orders/wines',
            //             component: Wines,
            //             whiteRoute: false,
            //             meta: {
            //                 title: '酒水管理',
            //                 authRequired: ['users', 'admin'],
            //                 parent: '订单管理',
            //                 parentKey: '/orders'
            //             }
            //         },
            //         {
            //             path: '/orders/fruit',
            //             redirect: '/orders/fruit/apple',
            //             whiteRoute: false,
            //             // 三级菜单
            //             // children: [
            //             //     {
            //             //         path: '/orders/fruit/watermelon',
            //             //         component: WatermelonOrder,
            //             //         whiteRoute: false,
            //             //         meta: {
            //             //             title: '西瓜订单',
            //             //             authRequired: ['users'],
            //             //             parent: '水果管理',
            //             //             parentKey: '/orders/fruit',
            //             //         }
            //             //     },
            //             //     {
            //             //         path: '/orders/fruit/apple/detail',
            //             //         component: AppleOrderDetail,
            //             //         whiteRoute: false,
            //             //         meta: {
            //             //             title: '苹果订单详情',
            //             //             authRequired: ['users'],
            //             //             parent: '水果管理',
            //             //             parentKey: '/orders/fruit',
            //             //             hidden: true
            //             //         }
            //             //     },
            //             //     {
            //             //         path: '/orders/fruit/apple',
            //             //         component: AppleOrder,
            //             //         whiteRoute: false,
            //             //         meta: {
            //             //             title: '苹果订单',
            //             //             authRequired: ['users'],
            //             //             parent: '水果管理',
            //             //             parentKey: '/orders/fruit',
            //             //         }
            //             //     },
            //             // ],
            //             meta: {
            //                 title: '水果管理',
            //                 authRequired: ['users'],
            //                 parent: '订单管理',
            //                 parentKey: '/orders'
            //             }
            //         },
            //     ],
            //     meta: {
            //         title: '订单管理',
            //         authRequired: ['users', 'admin'],
            //         // parent: '订单管理',
            //         parentKey: '/'
            //     }
            // },
            // antd组件
            {
                path: '/antd',
                redirect: '/antd/cascader',
                whiteRoute: false,
                children: [
                    {
                        path: '/antd/cascader',
                        component: CascaderDemo,
                        whiteRoute: false,
                        meta: {
                            title: '级联选择器',
                            authRequired: ['users', 'admin'],
                            parent: 'Antd',
                            parentKey: '/antd'
                        }
                    },
                    {
                        path: '/antd/table/detail/:id',
                        component: TableDetail,
                        whiteRoute: false,
                        meta: {
                            title: '表格详情',
                            authRequired: ['users', 'admin'],
                            parent: '表格组件',
                            parentKey: '/antd/table',
                            hidden: true
                        }
                    },
                    {
                        path: '/antd/table',
                        // exact: true,
                        component: TableDemo,
                        whiteRoute: false,
                        meta: {
                            title: '表格组件',
                            authRequired: ['users', 'admin'],
                            parent: 'Antd',
                            parentKey: '/antd'
                        }
                    },
                ],
                meta: {
                    title: 'Antd',
                    authRequired: ['users', 'admin'],
                    // parent: 'Antd',
                    parentKey: '/'
                }
            },
            // 404页面
            {
                path: '/*',
                component: ErrorPage,
                whiteRoute: false,
                meta: {
                    title: '404',
                    authRequired: ['users', 'admin']
                }
            }
        ],
        meta: {
            title: '系统',
            authRequired: ['users', 'admin']
        }
    }
]