const Router  = require('koa-router')
const router = new Router({prefix: '/questions'})
const  { create,
         updateById, 
         findAll, 
         findById, 
         checkQuestionExist, 
         checkQuestioner, 
         deleteQuestion  } = require('../controller/questions')


const { Auth } = require('../utils/auth')
const AUTH_USER = 8
router.get('/', findAll)
router.post('/', new Auth(AUTH_USER).m, create)
router.get('/:id', findById)
router.patch('/:id', new Auth(AUTH_USER).m, checkQuestionExist, checkQuestioner, updateById)
router.delete('/:id', new Auth(AUTH_USER).m, checkQuestionExist, checkQuestioner, deleteQuestion)
module.exports = router