import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];
export const items: MenuItem[] = [
    {
        key: '/home',
        label: '系统首页',
        icon: <PieChartOutlined />,
    },
    {
        key: 'users',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '/users/admin',
                label: '管理员列表',
            },
            {
                key: '/users/vip',
                label: 'VIP列表',
            }
        ],
        label: '人员管理',
    },
    {
        key: 'orders',
        icon: <MailOutlined />,
        children: [
            {
                key: '/orders/wines',
                label: '酒水管理',
            },
            {
                key: '/orders/fruit',
                label: '水果管理',
            }
        ],
        label: '订单管理',
    },
    {
        key: 'demos',
        icon: <SettingOutlined />,
        children: [
            {
                key: '/demos/demo',
                label: 'Demo',
            },
            {
                key: '/demos/icon',
                label: 'Icons',
            },
            {
                key: '/demos/useref',
                label: 'UseRef',
            },
            {
                key: '/demos/imperativeHandle',
                label: 'UseImperativeHandle',
            },
        ],
        label: 'Demo管理',
    },
    {
        key: 'antd',
        icon: <MailOutlined />,
        children: [
            {
                key: '/antd/cascader',
                label: '级联选择器',
            }
        ],
        label: 'Antd',
    },
];