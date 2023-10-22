import React, { FC, ReactElement, useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { cloneDeep } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
import { items } from '../../layout/sider/menuConfig'
import styles from './index.module.scss'
import { flattenRoutes } from '../../utils/breadcrumb'
import { routes } from 'src/router/routeLists'

interface IProps {}

type IBreadCrumbProp = {
  key: string
  label: React.ReactNode
  children?: any
  onClick: Function
}

const BreadCrumb: FC = (props: IProps): ReactElement => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const [breadCrumbItems, setBreadCrumbItems] = useState<IBreadCrumbProp[]>([])

  const [flatRoutes, setFlatRoutes] = useState<
    { key: string; label: string }[]
  >([])

  useEffect(() => {
    const flatRoutes: any = []
    flattenRoutes(cloneDeep(routes[1].children || []), flatRoutes)
    setFlatRoutes(flatRoutes)
  }, [])

  useEffect(() => {
    const breadCrumbItems: IBreadCrumbProp[] = getBreadCrumbItems(
      cloneDeep(items)
    )
    setBreadCrumbItems(breadCrumbItems)
    console.log(breadCrumbItems)
  }, [location]) // eslint-disable-line

  // 删除菜单配置 authRequired icon 属性
  const deleteMenuConfigPro = (items: MenuItemWithAuth) => {
    items.forEach(item => {
      delete item.authRequired
      delete item.icon
      if (!!item.children) {
        deleteMenuConfigPro(item.children)
      }
    })
    return items
  }

  const getBreadCrumbItems: (
    items: MenuItemWithAuth
  ) => IBreadCrumbProp[] = items => {
    const breadCrumbItems: IBreadCrumbProp[] = []
    getChildrenItems(deleteMenuConfigPro(items), breadCrumbItems, pathname)
    return breadCrumbItems
  }

  const getChildrenItems = (
    items: any,
    breadCrumbItems: IBreadCrumbProp[],
    pathname: any
  ) => {
    const matchedRoute = items.find((item: any) => pathname.includes(item.key)) // /orders/fruit/watermelon
    breadCrumbItems.push(matchedRoute)
    if (!!matchedRoute?.children?.length) {
      getChildrenItems(matchedRoute.children, breadCrumbItems, pathname)
    }
    return breadCrumbItems
  }

  const breadCrumbClick = ({ children, key }: IBreadCrumbProp) => {
    console.log(key, 'key-breadCrumbClick')
    if (!children && pathname !== key) {
      history.push(key)
    }
  }

  const pathSnippets = pathname.split('/').filter((i: any) => i)

  return (
    <div className={styles['breadcrumb-container']}>
      <Breadcrumb>
        {/* {breadCrumbItems.map(item => (
          <Breadcrumb.Item
            key={item.key}
            // 下拉菜单配置
            {...(item?.children && {
              menu: { items: item.children || [], onClick: breadCrumbClick }
            })}
            onClick={() => {
              breadCrumbClick(item)
            }}
          >
            {item.label}
          </Breadcrumb.Item>
        ))} */}
        {pathSnippets.map((_: any, index: number) => {
          const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
          const label = flatRoutes.find(item => item.key === url)?.label
          console.log(flatRoutes, 'flatRoutes')
          console.log('---99---', url)
          console.log('---100---', label)
          console.log('---101---', pathSnippets)
          return <Breadcrumb.Item key={url}>{label}</Breadcrumb.Item>
        })}
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumb
