const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

class Auth {
  constructor(level) {
    this.level = level || 1;

    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SPUSER_ADMIN = 32;
  }

  get m() {
    // token 检测
    // token 开发者 传递令牌
    // token body header
    // HTTP 规定 身份验证机制 HttpBasicAuth
    return async (ctx, next) => {
      const { authorization = '' } = ctx.request.header;
      const token = authorization.replace('Bearer ', '')
      let errMsg = "无效的token";
      // 无带token
      if (!token) {
        errMsg = "需要携带token值";
        ctx.throw(403, errMsg)
      }

      try {
        var decode = jwt.verify(token, secret);

      } catch (error) {
        // token 不合法 过期
        if (error.name === 'TokenExpiredError') {
          errMsg = "token已过期"
        }

        ctx.throw(403, errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = "权限不足"
        ctx.throw(403, errMsg)
      }

      ctx.auth = {
        id: decode.id,
        scope: decode.scope
      }
      await next()
    }
  }

}

module.exports = {
  Auth
}
