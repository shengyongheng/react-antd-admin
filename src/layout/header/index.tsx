import React, { FC, useState, useEffect } from 'react'
import styles from './index.module.less'
import { useHistory } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { setInlineCollapsed } from "@store/app/action"
import BreadCrumb from '@components/breadCrumb'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd';
interface IProps { }
const Header: FC<IProps> = (props): React.JSX.Element => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userType = useSelector((state: any) => state.user.userType)
  const inlineCollapsed = useSelector((state: any) => state.app.inlineCollapsed)

  const loginout = () => {
    localStorage.clear()
    history.go(0)
    history.replace('/login')
  }

  const toggleCollapsed = () => {
    dispatch(setInlineCollapsed());
  }

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

  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['header-left']}>
          <div className='inline-collapsed' onClick={toggleCollapsed}>
            {inlineCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div className='breadcrumbs'>
            <BreadCrumb />
          </div>
        </div>
        <div className={styles['header-right']}>
          <div className='user-info'>
            用户名：
            <Dropdown menu={{ items }} placement="bottom">
              <span className='username'>{userType}</span>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
