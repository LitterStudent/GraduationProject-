const Router  = require('koa-router')
const router = new Router({prefix: '/column'})
const { checkArticleExist, checkWriter} = require('../controller/article')
const  { create, 
        updateById, 
        findAll, 
        findById, 
        checkColumnExist, 
        checkColumner, 
        deleteArticle,
        addingColumn,
        deleteFromColumn,
        findArticleByColumn  } = require('../controller/column')
const { Auth } = require('../utils/auth')
const AUTH_USER = 8
// 查询所有专栏
router.get('/', findAll)
// 创建专栏
router.post('/', new Auth(AUTH_USER).m, create)
// 查询某篇专栏
// 判断专栏是否1正常
router.get('/:id', findById)
// 查询某篇专栏的文章
router.get('/:id/article', findArticleByColumn)
// 更新专栏
router.patch('/:id', new Auth(AUTH_USER).m, checkColumnExist, checkColumner, updateById)
// 删除专栏
router.delete('/:id', new Auth(AUTH_USER).m, checkColumnExist, checkColumner, deleteArticle)
// 将文章加入专栏
router.patch('/:column_id/article/:article_id', new Auth(AUTH_USER).m, checkColumnExist, checkColumner, checkArticleExist, checkWriter, addingColumn)
// 将文章从专栏去除
router.delete('/:column_id/article/:article_id', new Auth(AUTH_USER).m, checkColumnExist, checkColumner, checkArticleExist, checkWriter, deleteFromColumn)
module.exports = router