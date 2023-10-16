import React, { FC, useState, useEffect } from 'react'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import {} from 'antd'
interface IProps {}
const Header: FC<IProps> = (props): React.JSX.Element => {
  const history = useHistory()
  const loginout = () => {
    localStorage.clear()
    history.go(0)
    history.replace('/login')
  }
  useEffect(() => {}, [])
  return (
    <div className={styles['header-container']}>
      <div className={styles['breadcrumbs']}>面包屑</div>
      <div className={styles['user-info']} onClick={loginout}>
        退出登录
      </div>
    </div>
  )
}

export default Header
