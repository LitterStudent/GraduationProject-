import { useStore } from 'vuex'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permission = store.state.login.permissions
  // console.log(permission)
  return !!permission.find(
    (item: string) => item === `system:${pageName}:${handleName}`
  )
}
