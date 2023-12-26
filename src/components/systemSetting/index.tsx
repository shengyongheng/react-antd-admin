import React, { ReactElement, useState, useEffect } from 'react';
import { RocketTwoTone } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import type { ConfigProvider } from 'antd';
import { THEMES } from "./constants/theme"
import styles from "./index.module.less"
interface IProps {
    ConfigProvider: {
        config: typeof ConfigProvider['config']
    }
}
const SystemSetting = (props: IProps): ReactElement => {
    const { ConfigProvider } = props;
    const [open, setOpen] = useState(false);

    const setSystemTheme = (theme: ITheme) => {
        /**
         * antd ConfigProvider 配置简单 支持的变量比较少，只支持 6 个变量 antd@4.17之后的版本适用
         */
        ConfigProvider.config({
            theme,
        });
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className={styles['setting-system']}>
            <Button className={styles['open-setting-btn']} type="primary" onClick={showDrawer}>
                <RocketTwoTone />
            </Button>
            <Drawer title="系统设置" placement="right" onClose={onClose} open={open} getContainer={false}>
                <div className='system-theme-color'>主题色</div>
                <div className='system-themes'>
                    {
                        THEMES.map((item: ITheme) =>
                            <Button
                                key={item.primaryColor}
                                type="primary"
                                onClick={() => {
                                    setSystemTheme(item)
                                }}
                            >
                                {item.primaryColor}
                            </Button>)
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default SystemSetting