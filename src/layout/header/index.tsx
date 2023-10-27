import React, { FC, useState, useEffect } from 'react'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
import BreadCrumb from '@components/breadCrumb'
import { getStorage } from '@utils/storages'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd';
interface IProps { }
const Header: FC<IProps> = (props): React.JSX.Element => {
  const history = useHistory()
  const loginout = () => {
    localStorage.clear()
    history.go(0)
    history.replace('/login')
  }

  console.log(getStorage('userType'));

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => {
          history.push('/profile')
        }}>个人信息</span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={loginout}>退出登录</span>
      ),
    },
  ];

  useEffect(() => { }, [])
  return (
    <div className={styles['header-container']}>
      <div className='breadcrumbs'>
        <BreadCrumb />
      </div>
      <div className='user-info'>
        用户名：
        <Dropdown menu={{ items }} placement="bottom">
          <span className='username'>admin</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
