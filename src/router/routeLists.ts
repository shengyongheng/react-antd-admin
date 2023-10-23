import { lazy } from 'react'
const Layouts = lazy(() => import('../layout'))
const Login = lazy(() => import('../pages/login'))
const Home = lazy(() => import('../pages/home'))
const Admin = lazy(() => import('../pages/usersManagement/admin'))
const Vip = lazy(() => import('../pages/usersManagement/vip'))
const Demo = lazy(() => import('../pages/demoManagement/demo'))
const Icons = lazy(() => import('../pages/demoManagement/icons'))
const UseRef = lazy(() => import('../pages/demoManagement/useRef'))
const UseImperativeHandle = lazy(
  () => import('../pages/demoManagement/imperativeHandle')
)
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
    path: '/',
    component: Layouts,
    whiteRoute: false,
    children: [
      {
        path: '/home',
        component: Home,
        whiteRoute: false,
        meta: {
          title: '首页',
          authRequired: ['users', 'admin']
        }
      },
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
            path: '/orders/fruit/apple/detail',
            component: AppleOrderDetail,
            whiteRoute: false,
            meta: {
              title: '苹果订单详情',
              authRequired: ['users'],
            }
          },
          {
            path: '/orders/fruit/apple',
            component: AppleOrder,
            whiteRoute: false,
            meta: {
              title: '苹果订单',
              authRequired: ['users'],
              parent: '水果管理',
              parentKey: '/orders/fruit',
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

// export const routes: Routes[] = [
//   {
//     path: '/login',
//     component: Login,
//     whiteRoute: true,
//     meta: {
//       title: '登录',
//     }
//   },
//   {
//     path: '/',
//     component: Layouts,
//     whiteRoute: false,
//     children: [
//       {
//         path: '/home',
//         component: Home,
//         whiteRoute: false,
//         meta: {
//           title: '首页',
//           authRequired: ['users', 'admin']
//         }
//       },
//       {
//         path: '/user',
//         whiteRoute: false,
//         children: [
//           {
//             path: '/users/admin',
//             component: Admin,
//             whiteRoute: false,
//             meta: {
//               title: '管理员列表',
//               authRequired: ['admin']
//             }
//           },
//           {
//             path: '/users/vip',
//             component: Vip,
//             whiteRoute: false,
//             meta: {
//               title: 'VIP列表',
//               authRequired: ['admin']
//             }
//           },
//         ],
//         meta: {
//           title: '人员管理',
//           authRequired: ['users', 'admin'],
//         }
//       },
//       {
//         path: '/orders',
//         whiteRoute: false,
//         children: [
//           {
//             path: '/orders/wines',
//             component: Wines,
//             whiteRoute: false,
//             meta: {
//               title: '酒水管理',
//               authRequired: ['users', 'admin']
//             }
//           },
//           {
//             path: '/orders/fruit',
//             component: Fruit,
//             whiteRoute: false,
//             children: [
//               {
//                 path: '/orders/fruit/watermelon',
//                 component: WatermelonOrder,
//                 whiteRoute: false,
//                 meta: {
//                   title: '西瓜订单',
//                   authRequired: ['users']
//                 }
//               },
//               {
//                 path: '/orders/fruit/apple/detail/:id',
//                 component: AppleOrderDetail,
//                 whiteRoute: false,
//                 meta: {
//                   title: '苹果订单详情',
//                   authRequired: ['users']
//                 }
//               },
//               {
//                 path: '/orders/fruit/apple',
//                 component: AppleOrder,
//                 whiteRoute: false,
//                 // children: [
//                 //   {
//                 //     path: '/orders/fruit/apple/detail/:id',
//                 //     component: AppleOrderDetail,
//                 //     whiteRoute: false,
//                 //     meta: {
//                 //       title: '苹果订单详情',
//                 //       authRequired: ['users']
//                 //     }
//                 //   },
//                 // ],
//                 meta: {
//                   title: '苹果订单',
//                   authRequired: ['users']
//                 }
//               },
//             ],
//             meta: {
//               title: '水果管理',
//               authRequired: ['users']
//             }
//           },
//         ],
//         meta: {
//           title: '订单管理',
//           authRequired: ['users', 'admin'],
//         }
//       },
//       {
//         path: '/demos',
//         whiteRoute: false,
//         children: [
//           {
//             path: '/demos/demo',
//             component: Demo,
//             whiteRoute: false,
//             meta: {
//               title: 'DEMO',
//               authRequired: ['users', 'admin']
//             }
//           },
//           {
//             path: '/demos/icon',
//             component: Icons,
//             whiteRoute: false,
//             meta: {
//               title: 'DEMO',
//               authRequired: ['users', 'admin']
//             }
//           },
//           {
//             path: '/demos/useref',
//             component: UseRef,
//             whiteRoute: false,
//             meta: {
//               title: 'useRef',
//               authRequired: ['users', 'admin']
//             }
//           },
//           {
//             path: '/demos/imperativeHandle',
//             component: UseImperativeHandle,
//             whiteRoute: false,
//             meta: {
//               title: 'UseImperativeHandle',
//               authRequired: ['users', 'admin']
//             }
//           },
//         ],
//         meta: {
//           title: 'Demo管理',
//           authRequired: ['users', 'admin'],
//         }
//       },
//       {
//         path: '/antds',
//         whiteRoute: false,
//         children: [
//           {
//             path: '/antd/cascader',
//             component: CascaderDemo,
//             whiteRoute: false,
//             meta: {
//               title: '级联选择器',
//               authRequired: ['users', 'admin']
//             }
//           },
//         ],
//         meta: {
//           title: 'Antd',
//           authRequired: ['users', 'admin'],
//         }
//       },
//       {
//         path: '/*',
//         component: ErrorPage,
//         whiteRoute: false,
//         meta: {
//           title: '404',
//           authRequired: ['users', 'admin']
//         }
//       }
//     ],
//     meta: {
//       title: '系统',
//       authRequired: ['users', 'admin']
//     }
//   }
// ]
