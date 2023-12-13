import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
import styles from "./index.module.less"
interface IProps {

}
const Footer: FC<IProps> = (props): React.JSX.Element => {
    return (
        <>
            <div className={styles['footer-page']}>
                Footer
            </div>
        </>
    )
}

export default Footer