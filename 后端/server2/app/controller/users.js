const  User =   require('../model/user')
// const Question = require('../model/questions')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config/config')
const Answer = require('../model/answers')

class UsersCtl {
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限') }
        await next()
    }
    async findAll(ctx) {
        // select 可以让select为false 的字段显示出来
        // ctx.body = await User.find().select('password').select('name')
        // const { fileds } = ctx.query || []
        // const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
        let { per_page = 10, page = 1 } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        ctx.body = await User.find({name: new RegExp(ctx.query.q)}).limit(per_page).skip(page * per_page)
    }
    async findById(ctx) {
        const { fileds = '' } = ctx.query
        // if (!fileds) { fileds = []} 
        const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
        const user = await User.findById(ctx.params.id).select(selectFileds)
        if(!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user
    }
    async updateById(ctx) {
        ctx.verifyParams({
            name: { type:  'string', required: false },
            password: { type: 'string', required: false },
            avator_url: { type: 'string', required: false},
            gender: { type: 'string', required: false},
            headline: { type: 'string', required: false},
            location: { type: 'array', itemType: 'string', required: false},
            employments: { type: 'array', itemType: 'object', required: false },
            educations: { type: 'array', itemType: 'object', required: false}
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user
    }
    async deleteById(ctx) {

        const user = await User.findByIdAndRemove(ctx.params.id)
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.status = 204
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type:  'string', required: true },
            password: { type: 'string', required: true },
            email: { type: 'string', required: true }  
        });
        const { name, password, email } = ctx.request.body
        const repeateUser = await User.findOne({
             where: {
                 email
             }
             })
        if( repeateUser ) { ctx.throw(409, '用户已经占用')}
        const user = new User();
        user.username = name
        user.email = email
        user.password = password
        try {
            const res = await user.save();
            const data = {
              code: 200,
              email: res.email,
              username: res.username
            }
            ctx.body =  [null, data]
          } catch (err) {
            ctx.body = [err, null]
          }
    }
    async login (ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const user = await User.findOne(ctx.request.body)
        if(!user) { ctx.throw(401, '用户名或者密码不正确')}
        const { _id, name } = user
        const token = jsonwebtoken.sign({_id, name}, secret, { expiresIn: '1d'})
        ctx.body = {token : token}
    }
    async checkUserExist(ctx, next) {
        const user = await User.findById(ctx.params.id)
        if (!user) { ctx.throw(404, '用户不存在') }
        await next()
    }
    // 添加关注
    async follow(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following')
        if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
            me.following.push(ctx.params.id);
            me.save()
        }
        ctx.status = 204
    }
    // 查询关注
    async listFollowing(ctx) {
        const user = await User.findById(ctx.params.id).select('+following').populate('following')
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user.following
    }
    // 取消关注
    async unfollow(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+following')
        const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
        if (index > -1) {
            me.following.splice(index, 1)
            me.save()
        }
        ctx.status = 204
    }
    // 查询粉丝
    async listFollower (ctx) {
        // 查询用户，限制条件：关注列表内有 ctx.params.id 的用户
        const users = await User.find({ following: ctx.params.id })
        ctx.body = users
    }

    // 添加话题关注
    async followTopic(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+followingTopics')
        if (!me.followingTopics.map(id => id.toString()).includes(ctx.params.id)) {
            me.followingTopics.push(ctx.params.id);
            me.save()
        }
        ctx.status = 204
    }
    // 查询关注话题
    async listFollowingTopics(ctx) {
        const user = await User.findById(ctx.params.id).select('+followingTopics').populate('followingTopics')
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user.followingTopics
    }
    // 取消话题关注
    async unfollowTopic(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+followingTopics')
        const index = me.followingTopics.map(id => id.toString()).indexOf(ctx.params.id)
        if (index > -1) {
            me.followingTopics.splice(index, 1)
            me.save()
        }
        ctx.status = 204
    }
    async listQuestions(ctx) {
        const questions = await Question.find({ questioner: ctx.params.id})
        ctx.body = questions
    }

    // 点赞
    async likeAnswer(ctx, next) {
        const me = await User.findById(ctx.state.user._id).select('+linkingAnswers')
        if (!me.linkingAnswers.map(id => id.toString()).includes(ctx.params.id)) {
            me.linkingAnswers.push(ctx.params.id);
            me.save()
            await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 }})
        }
        ctx.status = 204
        await next();
    }
    // 列出点赞
    async listLikingAnswer(ctx) {
        const user = await User.findById(ctx.params.id).select('+linkingAnswers').populate('linkingAnswers')
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user.linkingAnswers
    }
    // 取消点赞
    async unLikingAnswer(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+linkingAnswers')
        const index = me.linkingAnswers.map(id => id.toString()).indexOf(ctx.params.id)
        if (index > -1) {
            me.linkingAnswers.splice(index, 1)
            me.save()
            await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: - 1 }})
        }
        ctx.status = 204
    }

    // 踩
    async dislikeAnswer(ctx, next) {
        const me = await User.findById(ctx.state.user._id).select('+dislinkingAnswers')
        if (!me.dislinkingAnswers.map(id => id.toString()).includes(ctx.params.id)) {
            me.dislinkingAnswers.push(ctx.params.id);
            me.save()
            // await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 }})
        }
        ctx.status = 204
        await next()
    }
    // 列出踩
    async listdisLinkingAnswer(ctx) {
        const user = await User.findById(ctx.params.id).select('+dislinkingAnswers').populate('dislinkingAnswers')
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user.dislinkingAnswers
    }
    // 取消踩
    async undisLikingAnswer(ctx) {
        const me = await User.findById(ctx.state.user._id).select('+dislinkingAnswers')
        const index = me.dislinkingAnswers.map(id => id.toString()).indexOf(ctx.params.id)
        if (index > -1) {
            me.dislinkingAnswers.splice(index, 1)
            me.save()
            // await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: - 1 }})
        }
        ctx.status = 204
    }
    
}

module.exports = new UsersCtl()