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
    whiteRoute: true,
    meta: {
      title: '登录',
    }
  },
  {
    path: '/profile',
    component: Profile,
    whiteRoute: false,
    meta: {
      title: '个人信息',
    }
  },
  {
    path: '/',
    component: Layouts,
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
      // 用户管理
      {
        path: '/users/admin',
        component: Admin,
        whiteRoute: false,
        meta: {
          title: '管理员列表',
          authRequired: ['admin'],
          parent: '人员管理',
          parentKey: '/users'
        }
      },
      {
        path: '/users/vip',
        component: Vip,
        whiteRoute: false,
        meta: {
          title: 'VIP列表',
          authRequired: ['admin'],
          parent: '人员管理',
          parentKey: '/users'
        }
      },
      // 订单管理
      {
        path: '/orders/wines',
        component: Wines,
        whiteRoute: false,
        meta: {
          title: '酒水管理',
          authRequired: ['users', 'admin'],
          parent: '订单管理',
          parentKey: '/orders'
        }
      },
      {
        path: '/orders/fruit',
        component: Fruit,
        whiteRoute: false,
        children: [
          {
            path: '/orders/fruit/watermelon',
            component: WatermelonOrder,
            whiteRoute: false,
            meta: {
              title: '西瓜订单',
              authRequired: ['users'],
              parent: '水果管理',
              parentKey: '/orders/fruit',
            }
          },
          {
            path: '/orders/fruit/apple',
            component: AppleOrder,
            whiteRoute: false,
            exact: true,
            meta: {
              title: '苹果订单',
              authRequired: ['users'],
              parent: '水果管理',
              parentKey: '/orders/fruit',
            }
          },
          {
            path: '/orders/fruit/apple/:id',
            component: AppleOrderDetail,
            whiteRoute: false,
            meta: {
              title: '苹果订单详情',
              authRequired: ['users'],
              parent: '水果管理',
              parentKey: '/orders/fruit',
              hidden: true
            }
          },
        ],
        meta: {
          title: '水果管理',
          authRequired: ['users'],
          parent: '订单管理',
          parentKey: '/orders'
        }
      },
      // 数据大屏
      {
        path: '/screen/list',
        component: ScreenLists,
        whiteRoute: false,
        meta: {
          title: '数据大屏列表',
          authRequired: ['admin', 'users'],
          parent: '数据大屏',
          parentKey: '/screen'
        }
      },
      //#region 
      // demo管理
      {
        path: '/demos/demo',
        component: Demo,
        whiteRoute: false,
        meta: {
          title: 'DEMO',
          authRequired: ['users', 'admin'],
          parent: 'DEMOS',
          parentKey: '/demos'
        }
      },
      {
        path: '/demos/icon',
        component: Icons,
        whiteRoute: false,
        meta: {
          title: 'ICON',
          authRequired: ['users', 'admin'],
          parent: 'DEMOS',
          parentKey: '/demos'
        }
      },
      {
        path: '/demos/mitt',
        component: Mitt,
        whiteRoute: false,
        meta: {
          title: 'MITT',
          authRequired: ['users', 'admin'],
          parent: 'DEMOS',
          parentKey: '/demos'
        }
      },
      {
        path: '/demos/useref',
        component: UseRef,
        whiteRoute: false,
        meta: {
          title: 'useRef',
          authRequired: ['users', 'admin'],
          parent: 'DEMOS',
          parentKey: '/demos'
        }
      },
      {
        path: '/demos/imperativeHandle',
        component: UseImperativeHandle,
        whiteRoute: false,
        meta: {
          title: 'UseImperativeHandle',
          authRequired: ['users', 'admin'],
          parent: 'DEMOS',
          parentKey: '/demos'
        }
      },
      // antd组件
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
      //#endregion
      {
        path: '/antd/table',
        // exact: true,
        component: TableDemo,
        whiteRoute: false,
        exact: true,
        meta: {
          title: '表格组件',
          authRequired: ['users', 'admin'],
          parent: 'Antd',
          parentKey: '/antd'
        }
      },
      {
        path: '/antd/table/:id',
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