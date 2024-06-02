import React, { FC, useState, useEffect } from 'react'
import {} from 'antd'
import { useSelector } from 'react-redux'
import { IfElse } from '@/components/ifElse'
import { useCompressImg } from '@hooks/index'
interface IProps {}
const Logo: FC = (props: IProps): React.JSX.Element => {
//   const [LogoImg] = useCompressImg('logo192.png') // 图片压缩

  const inlineCollapsed = useSelector((state: any) => state.app.inlineCollapsed)
  return (
    <>
      <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* <img style={{ height: '32px' }} src={LogoImg} alt="logo" /> */}
        <img
          style={{ height: '32px' }}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt="logo"
        />
        <IfElse if={!inlineCollapsed}>
          <span
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '18px',
              marginLeft: '8px',
            }}
          >
            Ant Design
          </span>
        </IfElse>
      </div>
    </>
  )
}

export default Logo
