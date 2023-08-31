import React, { FC, useEffect, Dispatch, SetStateAction, useState } from 'react';
import type { MenuProps } from 'antd';
import { useHistory } from "react-router-dom"
import { useOpenSelectKeys } from '../../hooks/useOpenSelectKeys'
import { Menu } from 'antd';
import { items } from './menuConfig';

interface IProps {

}
// submenu keys of first level
const rootSubmenuKeys = ['users', 'orders', 'demos'];
const Sider: FC<IProps> = (props): React.JSX.Element => {
    const history = useHistory();
    const [openKeys, selectedKeys, setOpenKeys] = useOpenSelectKeys(history);
    const [menuItems, setMenuItems] = useState<Array<IMenuItem>>();

    useEffect(() => {
        const userType = localStorage.getItem('userType');
        const menuItems = deleteAuthPro(getMenuItem(items, userType as string))
        setMenuItems(menuItems)
    }, []); // eslint-disable-line

    const getMenuItem = (items: IMenuItem[], userType: string) => {
        items.forEach((item, index) => {
            if (item.authRequired?.includes(userType)) {
                if (!!item?.children) {
                    getMenuItem(item?.children, userType)
                }
            } else {
                items.splice(index, 1)
            }
        })
        return items
    }

    const deleteAuthPro = (items: IMenuItem[]) => {
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
            (setOpenKeys as Dispatch<SetStateAction<string[]>>)(keys);
        } else {
            (setOpenKeys as Dispatch<SetStateAction<string[]>>)(latestOpenKey ? [latestOpenKey] : []);
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
                openKeys={(openKeys as string[])}
                selectedKeys={(selectedKeys as string[])}
                style={{ width: '100%' }}
                items={menuItems}
                onOpenChange={onOpenChange}
                onClick={onSwitchMenu}
            />
        </>
    )
}

export default Sider