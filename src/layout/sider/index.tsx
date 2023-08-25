import React, { FC, Dispatch, SetStateAction } from 'react';
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

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => (openKeys as string[]).indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            (setOpenKeys as Dispatch<SetStateAction<string[]>>)(keys);
        } else {
            (setOpenKeys as Dispatch<SetStateAction<string[]>>)(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const onSwitchMenu = (MenuItem: { key: string }) => {
        let { key } = MenuItem
        history.push(key);
    }
    return (
        <>
            <Menu
                mode="inline"
                openKeys={(openKeys as string[])}
                selectedKeys={(selectedKeys as string[])}
                style={{ width: '100%' }}
                items={items}
                onOpenChange={onOpenChange}
                onClick={onSwitchMenu}
            />
        </>
    )
}

export default Sider