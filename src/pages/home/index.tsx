import React, { FC, useState, useEffect } from 'react'
import {} from 'antd'
import styles from './index.module.scss'
interface IProps {}
const HomePage: FC = (props: IProps): React.JSX.Element => {

  return (
    <>
      <div className={styles['test']}>Home</div>
    </>
  )
}

export default HomePage
