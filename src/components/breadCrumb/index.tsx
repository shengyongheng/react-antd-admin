import React, { FC, ReactElement, useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { cloneDeep } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss'
import { addTags, switchTags } from 'src/redux-store/tags/action';
import { flattenNestBreadcrumbs, getNestBreadcrumbs } from '../../utils/breadcrumb'
import { routes } from 'src/router/routeLists'

interface IProps { }

const BreadCrumb: FC = (props: IProps): ReactElement => {
    const tags = useSelector(((state: any) => state.tags))
    const dispatch = useDispatch();
    const history = useHistory()
    const location = useLocation()
    const { pathname } = location

    const breadCrumbClick = (item: any) => {
        console.log(item.key, 'key-breadCrumbClick')
        if (!item.children && pathname !== item.key) {
            history.push(item.key)
            if (tags.tagsList.some((tagItem: any) => tagItem.path === item.key)) {
                dispatch(switchTags({ path: item.key }))
            } else {
                dispatch(addTags({ path: pathname, label: item.label }))
            }
        }
    }

    const pathSnippets = pathname.split('/').filter((i: any) => i)

    const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);

    useEffect(() => {
        let flattenBreadcrumbs: any = [] // 拍平面包屑列表
        const breadcrumbs: any = [] // 面包屑列表
        flattenBreadcrumbs = flattenNestBreadcrumbs(getNestBreadcrumbs(cloneDeep(routes[routes.length - 1].children || []), breadcrumbs))
        setBreadcrumbs(flattenBreadcrumbs)
    }, [])

    return (
        <div className={styles['breadcrumb-container']}>
            <Breadcrumb separator=">">
                {pathSnippets.map((_: any, index: number) => {
                    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
                    const breadcrumb = breadcrumbs.find(item => item.key === url)
                    document.title = breadcrumb?.label; // 设置浏览器标签名称
                    return <Breadcrumb.Item key={url}
                        // 下拉菜单配置
                        {...(breadcrumb?.children && {
                            menu: { items: breadcrumb.children || [], onClick: breadCrumbClick }
                        })}
                        onClick={() => {
                            breadCrumbClick(breadcrumb)
                        }}
                    >{breadcrumb?.label}</Breadcrumb.Item>
                })}
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumb
