const Router  = require('koa-router')
const router = new Router({prefix: '/users'})
const  { listFollowing, follow, findAll, findById, 
         updateById, deleteById, create, login, checkOwner, 
         unfollow, listFollower, checkUserExist,
         followTopic, unfollowTopic, listFollowingTopics,
         listQuestions,
         listLikingAnswer,likeAnswer,unLikingAnswer,
         listdisLinkingAnswer, dislikeAnswer, undisLikingAnswer
        } = require('../controller/users')
const { checkTopicExist } = require('../controller/topics')
const { checkAnswerExist } = require('../controller/answer')

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
//  更新本人用户信息 认证和鉴权
router.patch('/:id', auth,checkOwner, updateById)
// 删除用户
// router.delete('/:id',auth, checkOwner, deleteById)
router.delete('/:id',auth, deleteById)
router.post('/login', login)

// 获取用户的关注列表
router.get('/:id/following', listFollowing)
// 粉丝列表
router.get('/:id/followers', listFollower)
// 关注某个用户
router.put('/following/:id', auth, checkUserExist, follow)
// 取消关注
router.delete('/unfollowing/:id', auth, checkUserExist, unfollow)

// 查询某个用户关注的话题
router.get('/:id/followingTopic', listFollowingTopics)
// 关注话题
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)
// 取消关注话题
router.delete('/followingTopic/:id', auth, checkTopicExist, unfollowTopic)

// 用户的问题列表
router.get('/:id/questions', listQuestions)

// 查询某个用户点赞列表
router.get('/:id/likinganswer', listLikingAnswer)
// 点赞某个回答
router.put('/likinganswer/:id', auth, checkAnswerExist, likeAnswer, undisLikingAnswer)
// 取消点赞某个回答
router.delete('/likinganswer/:id', auth, checkAnswerExist, unLikingAnswer)

// 查询某个用户点赞列表
router.get('/:id/dislikinganswer', listdisLinkingAnswer)
// 点赞某个回答
router.put('/dislikinganswer/:id', auth, checkAnswerExist, dislikeAnswer, unLikingAnswer)
// 取消点赞某个回答
router.delete('/dislikinganswer/:id', auth, checkAnswerExist, undisLikingAnswer)


module.exports = router