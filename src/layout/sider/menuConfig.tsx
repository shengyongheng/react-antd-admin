export const items: MenuItemWithAuth = [
    {
        key: '/home',
        label: '系统首页',
        icon: 'PieChartOutlined',
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
            },
            {
                key: '/antd/table',
                label: '表格组件',
                authRequired: ['users', 'admin'],
            }
        ],
        label: 'Antd',
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
                    },
                ]
            }
        ],
        label: '订单管理',
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
        key: '/screen',
        icon: 'AreaChartOutlined',
        children: [
            {
                key: '/screen/list',
                label: '数据大屏列表',
                authRequired: ['admin', 'users'],
            },
        ],
        label: '数据大屏',
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
                key: '/demos/mitt',
                label: 'Mitt',
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
            {
                key: '/demos/editableTable',
                label: 'EditableTable',
                authRequired: ['users', 'admin'],
            },
        ],
        label: 'Demo管理',
        authRequired: ['users', 'admin'],
    },

];