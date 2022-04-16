import hdRequest from '../index'

export function userLoginRequest(user) {
  return hdRequest.post({
    url: '/users/login',
    data: user
  })
}

export function userInfoRequest(id) {
  return hdRequest.get({
    url: '/users/' + id
  })
}
