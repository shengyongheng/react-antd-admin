
function flatRoutes(routes: Routes[], flatedRoutes: any) {
    routes.forEach(item => {
        if (item.children) {
            flatRoutes(item.children, flatedRoutes)
            delete item.children
            flatedRoutes.push(item)
        } else {
            flatedRoutes.push(item)
        }
    })
    return routes
}

/**
 * @desc 获取面包屑配置
 * @param 路由表
 */

export function getBreadCrumbConfig(routes: Routes[], breadCrumbs: any) {
    // console.log(routes);
    // routes.forEach(item => {
    //     const parent = item.meta?.parent
    //     const parentKey = item.meta?.parentKey
    //     const title = item.meta.title
    //     const path = item.path
    //     const children = []
    //     if (!item.children) {
    //         breadCrumbs.push({
    //             label: title,
    //             key: path
    //         })
    //     } else {
    //         getBreadCrumbConfig(item.children, breadCrumbs)
    //     }
    // })

    // 扁平化路由
    flatRoutes(routes, breadCrumbs)
    console.log(breadCrumbs);
    return breadCrumbs
}


export const breadCrumbs = [
    {
        label: '首页',
        key: '/home'
    },
    {
        label: '人员管理',
        key: '/users',
        children: [
            {
                label: '管理员列表',
                key: '/users/admin'
            },
            {
                label: 'VIP列表',
                key: '/users/vip'
            },
        ]
    },
    {
        label: '订单管理',
        key: '/orders',
        children: [
            {
                label: '水果管理',
                key: '/orders/fruit',
                children: [
                    {
                        label: '苹果订单',
                        key: '/orders/fruit/apple',
                        // children: [
                        //     {
                        //         label: '苹果订单详情',
                        //         key: '/orders/fruit/apple/detail',
                        //     }
                        // ]
                    },
                    {
                        label: '苹果订单详情',
                        key: '/orders/fruit/apple/detail/:id',
                    },
                    {
                        label: '西瓜订单',
                        key: '/orders/fruit/watermelon'
                    },
                ]
            },
            {
                label: '酒水管理',
                key: '/orders/wines'
            },
        ]
    },
    {
        label: 'DEMOS',
        key: '/demos',
        children: [
            {
                label: 'DEMO',
                key: '/demos/demo',
            },
            {
                label: 'ICON',
                key: '/demos/icon'
            },
            {
                label: 'useref',
                key: '/demos/useref',
            },
            {
                label: 'imperativeHandle',
                key: '/demos/imperativeHandle'
            },
        ]
    },
    {
        label: 'ANTD',
        key: '/antd',
        children: [
            {
                label: 'cascader',
                key: '/antd/cascader',
            },
        ]
    }
]