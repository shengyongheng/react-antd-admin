import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useAddTags, useCollapseRows } from "@hooks/index"
import { } from 'antd'
// import styles from './index.module.scss'
import styles from './index.module.less'
interface IProps { }
const HomePage: FC = (props: IProps): React.JSX.Element => {
  const token = useSelector((state: any) => state.user.token)
  useAddTags();
  console.log(token, 'user.token')
  const [collapseRowText, setCollapseRowText] = useState('');
  const rows = 4;
  const { isCollapse, setIsCollapse, lineHeight } = useCollapseRows('collapse-extend-div', collapseRowText, rows);
  const toggleCollapse = () => {
    const ele = document.getElementById('collapse-extend-div') as any;
    if (!isCollapse) {
      ele.style.height = `${lineHeight * rows + 16}px`;
      setIsCollapse(true);
    } else {
      ele.style.height = 'auto';
      setIsCollapse(false);
    }
  };
  useEffect(() => {
    setCollapseRowText(
      `是一个只读属性，它返回该元素的像素高度。http 服务器, 它足够强大便于生产和使用, 用于本地测试和开发，http-server 是一个简单的零配置的命令行。
      导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。`,
    );
  }, []);
  return (
    <>
      token:{token}
      <div className={styles['less-test']}>Home</div>
      {/* 文本按行收起/展开 */}
      <div style={{ position: 'relative' }}>
        <div id='collapse-extend-div' className={styles['collapse-extend-div']}>
          {collapseRowText}
          <br />
          <br />
          {collapseRowText}
        </div>
        <div className={styles['extend-collapse-btn']} onClick={toggleCollapse}>
          {isCollapse ? '展开' : '收起'}
        </div>
      </div>
    </>
  )
}

export default HomePage
