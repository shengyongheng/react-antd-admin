import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
import styles from "./index.module.scss"
interface IProps {

}
const Header: FC<IProps> = (props): React.JSX.Element => {
    useEffect(() => {
    }, [])

    return (
        <div className={styles['test']}>
            Header
        </div>
    )
}

export default Header