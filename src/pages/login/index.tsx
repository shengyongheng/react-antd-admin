import React, { FC, useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'
interface IProps {}
const Login: FC = (props: IProps): React.JSX.Element => {
  const history = useHistory()
  const handleLogin = () => {
    localStorage.setItem('userType', 'admin')
    localStorage.setItem('token', 'test')
    history.push({
      pathname: '/home'
    })
  }
  return (
    <>
      <Button onClick={handleLogin}>登录</Button>
    </>
  )
}

export default Login
