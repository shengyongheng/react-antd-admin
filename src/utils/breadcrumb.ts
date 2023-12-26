export function flattenNestBreadcrumbs(nestBreadcrumbs: any) {
    const nestBreadcrumbsChildren: any = []
    getNestBreadcrumbsChildren(nestBreadcrumbs, nestBreadcrumbsChildren)
    nestBreadcrumbsChildren.forEach((item1: any) => {
        if (!nestBreadcrumbs.some((item2: any) => item2.path === item1.path)) {
            nestBreadcrumbs.push(item1)
        }
    })
    // 修改数据类型
    const itemTypeBreadcrumbs: any = []
    toItemType(nestBreadcrumbs, itemTypeBreadcrumbs)
    return itemTypeBreadcrumbs
}

export function getNestBreadcrumbs(flatRoutes: Routes[], breadcrumbs: any) {
    breadcrumbs.push(...flatRoutes)
    breadcrumbs.forEach((item: Routes) => {
        const { meta: { parent, parentKey } } = item
        if (parent && parentKey) {
            // 不存在该面包屑
            if (!isExact(breadcrumbs, item)) {
                const newBreadcrumb = {
                    path: parentKey,
                    meta: {
                        title: parent
                    },
                    children: [item]
                }
                breadcrumbs.push(newBreadcrumb)
            } else {
                breadcrumbs.forEach((item2: Routes) => {
                    const { path } = item2
                    if (path === parentKey) {
                        item2?.children?.push(item)
                    }
                })
            }
        }
    })
    return breadcrumbs
}

function isExact(breadcrumbs: any, newBreadcrumb: any) {
    return breadcrumbs.some((item: any) => item.path === newBreadcrumb.meta?.parentKey)
}

function getNestBreadcrumbsChildren(nestBreadcrumbs: any, nestBreadcrumbsChildren: any) {
    nestBreadcrumbs.forEach((item: any) => {
        if (item?.children) {
            getNestBreadcrumbsChildren(item?.children, nestBreadcrumbsChildren)
        } else {
            nestBreadcrumbsChildren.push(item)
        }
    })
}

function toItemType(nestBreadcrumbs: any, itemTypeBreadcrumbs: any) {
    nestBreadcrumbs.forEach((item: any, index: number) => {
        const { path: key, meta: { title: label } } = item
        if (item?.children) {
            const itemTypeBreadcrumbsChildren: any = []
            const itemTypeBreadcrumb = {
                key,
                label,
                children: undefined
            }
            // 剔除不在面包屑中显示的路由
            const noHiddenChildren = item.children.filter((item: any) => !item.meta.hidden)
            toItemType(noHiddenChildren, itemTypeBreadcrumbsChildren)
            itemTypeBreadcrumb.children = itemTypeBreadcrumbsChildren
            itemTypeBreadcrumbs.push(itemTypeBreadcrumb)
        } else {
            const itemTypeBreadcrumb = {
                key,
                label
            }
            itemTypeBreadcrumbs.push(itemTypeBreadcrumb)
        }
    })
    return itemTypeBreadcrumbs
}
