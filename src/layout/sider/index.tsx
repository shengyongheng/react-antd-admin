import React, { FC, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { useHistory } from "react-router-dom"
import { useOpenSelectKeys } from '@hooks/useOpenSelectKeys'
import { Menu } from 'antd';
import { items } from './menuConfig';

interface IProps {

}
// submenu keys of first level
const rootSubmenuKeys = ['users', 'orders', 'demos'];
const Sider: FC<IProps> = (props): React.JSX.Element => {
    const history = useHistory();
    const [openKeys, selectedKeys, setOpenKeys] = useOpenSelectKeys(history);
    const [menuItems, setMenuItems] = useState<MenuItemWithAuth>();
    useEffect(() => {
        const userType = localStorage.getItem('userType');
        const menuItems = deleteAuthPro(getMenuItem(items, userType as string))
        setMenuItems(menuItems)
    }, [items]); // eslint-disable-line

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
            (setOpenKeys as setStateProp<string[]>)(keys);
        } else {
            (setOpenKeys as setStateProp<string[]>)(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const onSwitchMenu = (menuItem: { key: string }) => {
        let { key } = menuItem
        history.push(key);
    }
    return (
        <>
            <Menu
                mode="inline"
                items={menuItems}
                style={{ width: '100%' }}
                openKeys={(openKeys as string[])}
                selectedKeys={(selectedKeys as string[])}
                defaultSelectedKeys={[window.location.pathname]}
                onOpenChange={onOpenChange}
                onClick={onSwitchMenu}
            />
        </>
    )
}

export default Sider