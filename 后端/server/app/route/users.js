const Router  = require('koa-router')
const router = new Router({prefix: '/users'})
const  { findAll, findById, updateById, deleteById, create, login, checkOwner } = require('../controller/users')
// const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const jwt  = require('koa-jwt')

//  1.手写认证
// const auth = async (ctx, next) => {
//     const { authorization = '' } = ctx.request.header;
//     const token = authorization.replace('Bearer ', '')
//     try{
//         const user = jsonwebtoken.verify(token, secret)
//         ctx.state.user = user
//     } catch (err) {
//         ctx.throw(401, err.message)
//     }
//     await next()
// }
//  2.jwt认证
const auth = jwt({ secret })

router.get('/', findAll)
// router.post('/:id', (ctx) => {
//     ctx.body = `这是用户${ctx.params.id}${{name: 'xioming'}}`
// })
router.post('/', create)
router.get('/:id', findById)
//  认证和鉴权
router.patch('/:id', auth,checkOwner, updateById)
// 删除用户
// router.delete('/:id',auth, checkOwner, deleteById)
router.delete('/:id',auth, deleteById)
router.post('/login', login)

module.exports = router