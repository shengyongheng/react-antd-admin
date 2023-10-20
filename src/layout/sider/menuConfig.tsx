// import { AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';

// type MenuItem = Required<MenuProps>['items'][number];

// type IAuthRequireType = 'users' | 'admin'

// type IAuthRequire<T> = { authRequired: Array<T> }

// type MenuItemWithAuth = Array<MenuItem & IAuthRequire<IAuthRequireType> & { children?: Array<MenuItem & IAuthRequire<IAuthRequireType> & { children?: Array<MenuItem & IAuthRequire<IAuthRequireType>> }> }>;

// // 自定义 Pick 工具类型
// type MyPick<T, K extends keyof T> = {
//     [Key in K]: T[Key]
// }

// type MyDiGui<T, K> = Array<T & K & { children?: Array<T & K & { children?: Array<T & K> }> }>

// type MenuItemWithAuth2 = MyDiGui<MenuItem, IAuthRequire<IAuthRequireType>>

export const items: MenuItemWithAuth = [
    {
        key: '/home',
        label: '系统首页',
        icon: 'PieChartOutlined',
        authRequired: ['users', 'admin'],
    },
    {
        key: '/users',
        icon: 'AppstoreOutlined',
        children: [
            {
                key: '/users/admin',
                label: '管理员列表',
                authRequired: ['admin'],
            },
            {
                key: '/users/vip',
                label: 'VIP列表',
                authRequired: ['admin'],
            }
        ],
        label: '人员管理',
        authRequired: ['users', 'admin'],
    },
    {
        key: '/orders',
        icon: 'MailOutlined',
        children: [
            {
                key: '/orders/wines',
                label: '酒水管理',
                authRequired: ['users'],
            },
            {
                key: '/orders/fruit',
                label: '水果管理',
                authRequired: ['users'],
                children: [
                    {
                        key: '/orders/fruit/watermelon',
                        label: '西瓜订单',
                        authRequired: ['users'],
                    },
                    {
                        key: '/orders/fruit/apple',
                        label: '苹果订单',
                        authRequired: ['users'],
                        // children: [
                        //     {
                        //         key: '/orders/fruit/apple/detail',
                        //         label: '订单详情',
                        //         authRequired: ['users'],
                        //         undisplay: true // 不能显示在面包屑中
                        //     },
                        // ]
                    },
                ]
            }
        ],
        label: '订单管理',
        authRequired: ['users', 'admin'],
    },
    {
        key: '/demos',
        icon: 'SettingOutlined',
        children: [
            {
                key: '/demos/demo',
                label: 'Demo',
                authRequired: ['users', 'admin'],
            },
            {
                key: '/demos/icon',
                label: 'Icons',
                authRequired: ['users', 'admin'],
            },
            {
                key: '/demos/useref',
                label: 'UseRef',
                authRequired: ['users', 'admin'],
            },
            {
                key: '/demos/imperativeHandle',
                label: 'UseImperativeHandle',
                authRequired: ['users', 'admin'],
            },
        ],
        label: 'Demo管理',
        authRequired: ['users', 'admin'],
    },
    {
        key: '/antd',
        icon: 'MailOutlined',
        children: [
            {
                key: '/antd/cascader',
                label: '级联选择器',
                authRequired: ['users', 'admin'],
            }
        ],
        label: 'Antd',
        authRequired: ['users', 'admin'],
    },
];