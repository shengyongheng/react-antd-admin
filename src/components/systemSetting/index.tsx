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
        // 替换主题
        /**
         * antd ConfigProvider 配置简单 支持的变量比较少，只支持 6 个变量 antd@4.17之后的版本适用
         */
        ConfigProvider.config({
            prefixCls: 'ant',
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
            <Button type="primary" onClick={showDrawer}>
                <RocketTwoTone />
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <div className={styles['theme']}>主题色</div>
                {
                    THEMES.map((item: ITheme) =>
                        <Button
                            key={item.primaryColor}
                            type="primary"
                            style={{ color: item.primaryColor }}
                            onClick={() => {
                                setSystemTheme(item)
                            }}
                        >
                            修改主题色为{item.primaryColor}
                        </Button>)
                }
            </Drawer>
        </div>
    )
}

export default SystemSetting