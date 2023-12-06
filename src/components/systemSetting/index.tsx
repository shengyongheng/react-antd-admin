import React, { ReactElement, useState, useEffect } from 'react';
import { RocketTwoTone } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { THEMES } from "./constants/theme"
interface IProps {
    ConfigProvider: any
}
const SystemSetting = (props: IProps): ReactElement => {
    const { ConfigProvider } = props;
    const [open, setOpen] = useState(false);

    const setSystemTheme = (theme: keyof typeof THEMES) => {
        // 替换主题
        ConfigProvider.config({
            prefixCls: 'ant',
            theme: THEMES[theme],
        });
    };


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                <RocketTwoTone />
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <Button type="primary" onClick={() => {
                    setSystemTheme('theme1')
                }}>
                    修改主题色
                </Button>
            </Drawer>
        </>
    )
}

export default SystemSetting