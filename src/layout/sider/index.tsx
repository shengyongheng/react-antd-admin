import React, { FC, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import * as Icons from '@ant-design/icons'
import { Menu } from 'antd';
import { items } from './menuConfig';

const iconList: any = Icons

interface IProps {

}
// submenu keys of first level
const rootSubmenuKeys = ['/users', '/screen', '/orders', '/demos', '/antd'];
const Sider: FC<IProps> = (props): React.JSX.Element => {
    const history = useHistory();
    const inlineCollapsed = useSelector((state: any) => state.app.inlineCollapsed)
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItemWithAuth>();
    useEffect(() => {
        const userType = localStorage.getItem('userType');
        // 1. 获取有权限的菜单列表 2. 删除 authRequired 属性 3. 添加菜单 icon
        const menuItems = addIconToMenu(deleteAuthPro(getMenuItem(items, userType as string)))
        setMenuItems(menuItems)
        // console.log(menuItems, 'menuItems');
    }, [items]); // eslint-disable-line

    useEffect(() => {
        const currentOpenKeys: string[] = [];
        const handleOpenkeys = (items: any) => {
            items.forEach((item: any) => {
                if (history.location.pathname.includes(item.key)) {
                    currentOpenKeys.push(item.key);
                    if (item.children) {
                        handleOpenkeys(item.children);
                    } else {
                        setSelectedKeys([item.key]);
                    }
                }
            })
        }
        setOpenKeys(currentOpenKeys);
        handleOpenkeys(items);
    }, [history.location]);

    const getMenuItem = (items: MenuItemWithAuth, userType: string) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].authRequired?.includes(userType)) {
                if (!!items[i].children) {
                    const children = items[i].children as MenuItemWithAuth
                    const hasAuthChild = children.some(item => item.authRequired?.includes(userType))
                    if (hasAuthChild) {
                        getMenuItem(items[i].children as MenuItemWithAuth, userType)
                    } else {
                        items.splice(i, 1)
                    }
                }
            } else {
                items.splice(i, 1)
                i--
            }
        }
        return items
    }

    /**
     * 菜单列表添加icon
     * @param items 菜单列表
     * @returns
     */
    function addIconToMenu(items: MenuItemWithAuth) {
        for (let i = 0; i < items.length; i++) {
            if (!!items[i].icon) {
                items[i].icon = React.createElement(iconList[items[i].icon])
            }
            if (!!items[i].children) {
                items[i].children = addIconToMenu(items[i].children)
            }
        }

        return items
    }

    const deleteAuthPro = (items: MenuItemWithAuth) => {
        items.forEach((item) => {
            delete item.authRequired
            if (!!item.children) {
                deleteAuthPro(item.children)
            }
        })
        return items
    }

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => (openKeys as string[]).indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onSwitchMenu = (menuItem: { key: string }) => {
        let { key } = menuItem
        history.push(key);
        setSelectedKeys([key]);
    }

    return (
        <>
            <Menu
                mode="inline"
                items={menuItems}
                theme='dark'
                openKeys={openKeys as string[]}
                selectedKeys={(selectedKeys as string[])}
                inlineCollapsed={inlineCollapsed}
                // defaultSelectedKeys={[history.location.pathname]}
                onOpenChange={onOpenChange}
                onClick={onSwitchMenu}
            />
        </>
    )
}

export default Sider

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Menu } from 'antd';
// import React, { useState, useEffect } from 'react';

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//     label: React.ReactNode,
//     key: React.Key,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
//     type?: 'group',
// ): MenuItem {
//     return {
//         key,
//         icon,
//         children,
//         label,
//         type,
//     } as MenuItem;
// }

// const items: MenuItem[] = [
//     getItem('Navigation One', 'sub1', <MailOutlined />, [
//         getItem('Option 1', '1'),
//         getItem('Option 2', '2'),
//         getItem('Option 3', '3'),
//         getItem('Option 4', '4'),
//     ]),
//     getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//         getItem('Option 5', '5'),
//         getItem('Option 6', '6'),
//         getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//     ]),
//     getItem('Navigation Three', 'sub4', <SettingOutlined />, [
//         getItem('Option 9', '9'),
//         getItem('Option 10', '10'),
//         getItem('Option 11', '11'),
//         getItem('Option 12', '12'),
//     ]),
// ];

// // submenu keys of first level
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

// const Sider: React.FC = () => {
//     const [openKeys, setOpenKeys] = useState(['sub1']);

//     const onOpenChange: MenuProps['onOpenChange'] = keys => {
//         const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
//         if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
//             setOpenKeys(keys);
//         } else {
//             setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
//         }
//     };

//     useEffect(() => {
//         console.log(openKeys, 'openKeys');
//     }, [openKeys]);

//     return (
//         <Menu
//             mode="inline"
//             openKeys={openKeys}
//             onOpenChange={onOpenChange}
//             style={{ width: 256 }}
//             items={items}
//         />
//     );
// };

// export default Sider;