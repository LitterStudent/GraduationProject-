const Router  = require('koa-router')
const router = new Router({prefix: '/topics'})
const  { create, updateById, findAll, findById,
     listFollowers, listQuestions } = require('../controller/topics')
// const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const jwt  = require('koa-jwt')
const { checkTopicExist } = require('../controller/topics')

const auth = jwt({ secret })

router.get('/', findAll)
router.post('/', auth, create)
router.get('/:id', checkTopicExist, findById)
router.patch('/:id', auth, checkTopicExist, updateById)
router.get('/:id/followers', checkTopicExist, listFollowers)
router.get('/:id/questions', checkTopicExist, listQuestions)
module.exports = router