const Router  = require('koa-router')
const router = new Router({prefix: '/questions'})
const  { create, updateById, findAll, findById, 
    checkQuestionExist, checkQuestioner, deleteQuestion  } = require('../controller/questions')
const { secret } = require('../config')
const jwt  = require('koa-jwt')

const auth = jwt({ secret })

router.get('/', findAll)
router.post('/', auth, create)
router.get('/:id', checkQuestionExist, findById)
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, updateById)
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, deleteQuestion)
module.exports = router