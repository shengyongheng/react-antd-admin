import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
import { useSelector } from 'react-redux'
import { IfElse } from '@/components/ifElse';
interface IProps {

}
const Logo: FC = (props: IProps): React.JSX.Element => {
    const inlineCollapsed = useSelector((state: any) => state.app.inlineCollapsed);
    return (
        <>
            <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img style={{ height: '32px' }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
                <IfElse if={!inlineCollapsed}>
                    <span style={{
                        color: 'rgba(0, 0, 0, 0.88)',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginLeft: '8px'
                    }}>Ant Design</span >
                </IfElse>
            </div>
        </>
    )
}

export default Logo