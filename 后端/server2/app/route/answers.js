const Router  = require('koa-router')
const router = new Router({prefix: '/questions/:questionId/answers'})
const  { create, updateById, findAll, findById, 
    checkAnswerExist, checkAnswerer, deleteAnswer  } = require('../controller/answer')
const { secret } = require('../config')
const jwt  = require('koa-jwt')

const auth = jwt({ secret })

router.get('/', findAll)
router.post('/', auth, create)
router.get('/:id', checkAnswerExist, findById)
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, updateById)
router.delete('/:id', auth, checkAnswerExist, checkAnswerer, deleteAnswer)
module.exports = router