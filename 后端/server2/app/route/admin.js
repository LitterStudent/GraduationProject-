const Router = require('koa-router')
const router = new Router({ prefix: '/admin'})
const { create, login } = require('../controller/admin')

router.post('/', create)
router.post('/login', login)

module.exports = router