import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1. 先加载所有的 routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2. 根据菜单添加需要的 routes
  const _recursetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu
        }
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recursetRoute(menu.children)
      }
    }
  }
  _recursetRoute(userMenus)
  return routes
}

export function pathmapMenu(
  userMenus: any[],
  route: any,
  breadcrumbs?: any[]
): any {
  for (const item of userMenus) {
    // debugger
    if (item.type === 1) {
      const res = pathmapMenu(item.children || [], route, breadcrumbs)
      if (res) {
        breadcrumbs?.unshift(res)
        breadcrumbs?.unshift(item)
        return res
      }
    } else if (item.type === 2 && item.url === route.path) {
      return item
    }
  }
}

export function pathmapBreadcrumb(userMenus: any[], route: any): any {
  const breadcrumbs: any[] = []
  pathmapMenu(userMenus, route, breadcrumbs)
  return breadcrumbs
}

export function mapMenusToPermissions(userMenus: any[]): any[] {
  const permission: string[] = []

  const _recursetGetPermission = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recursetGetPermission(menu.children || [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recursetGetPermission(userMenus)
  // console.log(permission)
  return permission
}
export function menusMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recursetGetLeafKeys = function (menus: any) {
    for (const menu of menus) {
      if (menu.children) {
        _recursetGetLeafKeys(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recursetGetLeafKeys(menuList)
  return leafKeys
}

export { firstMenu }
