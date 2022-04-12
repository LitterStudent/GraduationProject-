const Router = require('koa-router')
const router = new Router({ prefix: '/comment'})
const { checkAnswerExist } = require('../controller/answer')
const { createComment, 
        checkCommenter, 
        deleteComment,
        checkCommentExist,
        createRelpy,
        findAll,
        findAllReply  } = require('../controller/comment')
const { Auth } = require('../utils/auth')
const AUTH_USER = 8
// 创建评论
router.post('/:id', new Auth(AUTH_USER).m, checkAnswerExist, createComment)
// 删除评论
router.delete('/:id',new Auth(AUTH_USER).m, checkCommentExist, checkCommenter, deleteComment)
// 查看某个回复的所有评论
router.get('/answer/:id', checkAnswerExist, findAll)
// 查看某个评论的所有二级评论
router.get('/replyComment/:id', checkAnswerExist, findAllReply)
// 创建二级评论
router.post('/:id/reply', new Auth(AUTH_USER).m, checkCommentExist, createRelpy)

module.exports = router