import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useAddTags, useCollapseRows } from '@hooks/index'
import TooltipWrapper from '@/components/tooltipWrapper'
// import styles from './index.module.scss'
import styles from './index.module.less'
import { KmsIcon } from '@/components/svgLazyLoad'
// import AISvg from '/assets/icons/ai.svg'
interface IProps { }
const HomePage: FC = (props: IProps): React.JSX.Element => {
  const token = useSelector((state: any) => state.user.token)
  useAddTags()
  console.log(token, 'user.token')
  const [collapseRowText, setCollapseRowText] = useState('')
  const [controlVal, setControlVal] = useState('受控组件默认值')
  const rows = 4
  const { isCollapse, setIsCollapse, lineHeight } = useCollapseRows('collapse-extend-div', collapseRowText, rows)
  const toggleCollapse = () => {
    const ele = document.getElementById('collapse-extend-div') as any
    if (!isCollapse) {
      ele.style.height = `${lineHeight * rows + 16}px`
      setIsCollapse(true)
    } else {
      ele.style.height = 'auto'
      setIsCollapse(false)
    }
  }
  useEffect(() => {
    setCollapseRowText(
      `是一个只读属性，它返回该元素的像素高度。http 服务器, 它足够强大便于生产和使用, 用于本地测试和开发，http-server 是一个简单的零配置的命令行。
      导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。`
    )
  }, [])
  return (
    <>
      <TooltipWrapper text={collapseRowText || 'hello,world'} placement="bottom" maxWidth={200}></TooltipWrapper>
      token:{token}
      <div className={styles['less-test']}>Home</div>
      {/* 文本按行收起/展开 */}
      <div style={{ position: 'relative' }}>
        <div id="collapse-extend-div" className={styles['collapse-extend-div']}>
          {collapseRowText}
          <br />
          <br />
          {collapseRowText}
        </div>
        <div className={styles['extend-collapse-btn']} onClick={toggleCollapse}>
          {isCollapse ? '展开' : '收起'}
        </div>
      </div>
      <div id='id1' onClick={() => {
        const cloneNodeFalse = document.getElementById('id1')?.cloneNode()
        const cloneNodeTrue = document.getElementById('id1')?.cloneNode(true)
        console.log(cloneNodeFalse, 'cloneNodeFalse');
        console.log(cloneNodeTrue, 'cloneNodeTrue');

      }}>
        <h2>受控和非受控组件</h2>
        <p>受控组件</p>
        <input
          value={controlVal}
          onChange={(e) => {
            setControlVal(e.target.value)
          }}
        />
      </div>
      <h2>SVG 懒加载优化</h2>
      {/* <img src={AISvg} alt="" /> */}
      <KmsIcon iconPath='/assets/icons/ai.svg' variousColors />
    </>
  )
}

export default HomePage
