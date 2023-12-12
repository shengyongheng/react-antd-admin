import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
interface IProps {

}
const Logo: FC = (props: IProps): React.JSX.Element => {

    return (
        <>
            <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img style={{ height: '32px' }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
                <span style={{
                    color: 'rgba(0, 0, 0, 0.88)',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginLeft: '8px'
                }}>Ant Design</span >
            </div>
        </>
    )
}

export default Logo