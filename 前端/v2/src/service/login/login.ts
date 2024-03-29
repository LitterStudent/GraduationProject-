import hdRequest from '../index'

import type { IAccount, ILoginResult } from './type'
import type { IDataType } from '../type'

enum LoginAPI {
  AccountLogin = '/admin/login',
  UserInfo = '/admin/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return hdRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: false
  })
}

export function userInfoRequest() {
  return hdRequest.get<IDataType>({
    url: LoginAPI.UserInfo,
    showLoading: false
  })
}

export function userMenusByRoleIdRequest(id: string) {
  return hdRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
