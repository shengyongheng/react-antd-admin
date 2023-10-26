import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useAddTags } from "@hooks/useAddTags"
import { } from 'antd'
import styles from './index.module.scss'
interface IProps { }
const HomePage: FC = (props: IProps): React.JSX.Element => {
  const token = useSelector((state: any) => state.user.token)
  useAddTags();
  console.log(token, 'user.token')
  useEffect(() => { }, [])
  return (
    <>
      token:{token}
      <div className={styles['test']}>Home</div>
    </>
  )
}

export default HomePage
