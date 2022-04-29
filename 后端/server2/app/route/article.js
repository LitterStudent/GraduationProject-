const Router  = require('koa-router')
const router = new Router({prefix: '/article'})
const  { create, updateById, findAll, findById, 
    checkArticleExist, checkWriter, deleteArticle  } = require('../controller/article')
const { Auth } = require('../utils/auth')
const AUTH_USER = 8
// 查询所有文章
router.get('/', findAll)
// 创建文章
router.post('/', new Auth(AUTH_USER).m, create)
// // 查询某篇文章
// // 判断文章是否1正常
router.get('/:id', new Auth(AUTH_USER).m, findById)
// // 点赞和取消点赞
// // 判断文章是否1正常或者2待审核（不为0禁用）
router.patch('/:id', new Auth(AUTH_USER).m, checkArticleExist, checkWriter, updateById)
router.delete('/:id', new Auth(AUTH_USER).m, checkArticleExist, checkWriter, deleteArticle)
module.exports = router