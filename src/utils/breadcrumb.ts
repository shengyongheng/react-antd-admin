export function flattenRoutes (routes: Routes[], flatRoutes: any) {
  routes.forEach(item => {
    if (item.children) {
      flatRoutes?.push({
        label: item.meta.title,
        key: item.path
      })
      flattenRoutes(item.children, flatRoutes)
    } else {
      flatRoutes?.push({
        label: item.meta.title,
        key: item.path
      })
    }
  })
  return routes
}
