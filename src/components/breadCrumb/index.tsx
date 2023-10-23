import React, { FC, ReactElement, useState, useEffect, useRef } from 'react';
import { Breadcrumb } from 'antd'
import { cloneDeep } from "lodash"
import { useHistory, useLocation } from "react-router-dom"
import { items } from '../../layout/sider/menuConfig';
import { routes } from '../../router/routeLists';
import { getBreadCrumbConfig, breadCrumbs } from '@utils/breadcrumb';
import styles from "./index.module.scss"

interface IProps {

}

type IBreadCrumbProp = { key: string; label: React.ReactNode; children?: any; onClick: Function }

const BreadCrumb: FC = (props: IProps): ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const { pathname } = location
    const [breadCrumbItems, setBreadCrumbItems] = useState<IBreadCrumbProp[]>([]);

    const pathSnippets = pathname.split('/').filter((i: any) => i);

    useEffect(() => {
        const breadCrumbs: any = []
        getBreadCrumbConfig(cloneDeep(routes[1].children || []), breadCrumbs)
        console.log(breadCrumbs);
    }, []);

    useEffect(() => {
        const breadCrumbItems: IBreadCrumbProp[] = getBreadCrumbItems(cloneDeep(items));
        setBreadCrumbItems(breadCrumbItems)
        // console.log(breadCrumbItems, 'breadCrumbItems');
    }, [location]); // eslint-disable-line

    // 删除菜单配置 authRequired icon 属性
    const deleteMenuConfigPro = (items: MenuItemWithAuth) => {
        items.forEach((item) => {
            delete item.authRequired
            delete item.icon
            if (!!item.children) {
                deleteMenuConfigPro(item.children)
            }
        })
        return items
    }

    const getBreadCrumbItems: (items: MenuItemWithAuth) => IBreadCrumbProp[] = (items) => {
        const breadCrumbItems: IBreadCrumbProp[] = [];
        getChildrenItems(breadCrumbs, breadCrumbItems, pathname)
        // getChildrenItems(deleteMenuConfigPro(items), breadCrumbItems, pathname)
        return breadCrumbItems
    }

    const getChildrenItems = (items: any, breadCrumbItems: IBreadCrumbProp[], pathname: any) => {
        const matchedRoute = items.find((item: any) => pathname.includes(item.key)) // /orders/fruit/watermelon
        breadCrumbItems.push(matchedRoute)
        if (!!matchedRoute?.children?.length) {
            getChildrenItems(matchedRoute.children, breadCrumbItems, pathname)
        }
        return breadCrumbItems
    }

    const breadCrumbClick = ({ children, key }: IBreadCrumbProp) => {
        console.log(key, 'key-breadCrumbClick');
        if (!children && pathname !== key) {
            history.push(key)
        }
    }
    return (
        <div className={styles['breadcrumb-container']}>
            <Breadcrumb>
                {/* {
                    breadCrumbItems.map(item =>
                        <Breadcrumb.Item key={item.key}
                            // 下拉菜单配置
                            {...(item?.children && { menu: { items: item.children || [], onClick: breadCrumbClick } })}
                            onClick={() => {
                                breadCrumbClick(item)
                            }}>
                            {item.label}
                        </Breadcrumb.Item>
                    )
                } */}
                {
                    pathSnippets.map((_: any, index: number) => {
                        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                        // console.log(url, 'url');
                        return (
                            <Breadcrumb.Item key={url}>
                                {/* {url} */}
                                {/* {breadCrumbItems2.find(item => item.path === url)?.meta?.title} */}
                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumb