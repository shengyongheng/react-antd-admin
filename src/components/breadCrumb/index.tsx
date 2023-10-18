import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Breadcrumb } from 'antd'
import { cloneDeep } from "lodash"
import { useHistory, useLocation } from "react-router-dom"
import { items } from '../../layout/sider/menuConfig';
import styles from "./index.module.scss"

interface IProps {

}

type IBreadCrumbProp = { key: string; label: React.ReactNode; children?: any; onClick: Function }

const BreadCrumb: FC = (props: IProps): ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const [breadCrumbItems, setBreadCrumbItems] = useState<IBreadCrumbProp[]>([]);

    useEffect(() => {
        const breadCrumbItems: IBreadCrumbProp[] = getBreadCrumbItems(cloneDeep(items));
        setBreadCrumbItems(breadCrumbItems)
        console.log(breadCrumbItems);
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
        const { pathname } = location;
        const breadCrumbItems: IBreadCrumbProp[] = [];
        getChildrenItems(deleteMenuConfigPro(items), breadCrumbItems, pathname)
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

    const breadCrumbClick = (item: IBreadCrumbProp) => {
        console.log(item, 'item-breadCrumbClick');
        if (!item.children) {
            history.push(item.key)
        }
    }

    const dropdownClick = (item: IBreadCrumbProp) => {
        console.log(item, 'item-dropdownClick');
        if (!item.children) {
            history.push(item.key)
        }
    }
    return (
        <>
            <Breadcrumb>
                {
                    breadCrumbItems.map(item =>
                        <Breadcrumb.Item key={item.key}
                            // 下拉菜单配置
                            {...(item?.children && { menu: { items: item.children || [], onClick: dropdownClick } })}
                            onClick={() => {
                                breadCrumbClick(item)
                            }}>
                            {item.label}
                        </Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
        </>
    )
}

export default BreadCrumb