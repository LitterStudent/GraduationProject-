const Router  = require('koa-router')
const router = new Router({prefix: '/questions/:questionId/answers'})
const  { create, updateById, findAll, findById, 
    checkAnswerExist, checkAnswerer, deleteAnswer  } = require('../controller/answer')
const { checkQuestionExist2 } = require('../controller/questions')
const { Auth } = require('../utils/auth')
const AUTH_USER = 8
// 先判断查找的问题是否存在
router.get('/', checkQuestionExist2, findAll)
router.post('/', new Auth(AUTH_USER).m, checkQuestionExist2, create)
router.get('/:id', checkAnswerExist, findById)
router.patch('/:id', new Auth(AUTH_USER).m, checkAnswerExist, checkAnswerer, updateById)
router.delete('/:id', new Auth(AUTH_USER).m, checkAnswerExist, checkAnswerer, deleteAnswer)
module.exports = router