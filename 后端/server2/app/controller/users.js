const  User =   require('../model/user')
const Follow = require('../model/follow')
// const Question = require('../model/questions')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config/config')
const Answer = require('../model/answers')
const Auth = require('../utils/auth')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const AUTH_USER = 8
const AUTH_ADMIN = 16
class UsersCtl {
    async checkOwner(ctx, next) {
        if (ctx.params.id != ctx.auth.id) { ctx.throw(403, '没有权限') }
        await next()
    }
    async findAll(ctx) {
        // select 可以让select为false 的字段显示出来
        // ctx.body = await User.find().select('password').select('name')
        // const { fileds } = ctx.query || []
        // const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
        let { per_page = 10, page = 1, email, status, username } = ctx.query
        const scop = 'bh'
        per_page = per_page - 0
        page = page - 0
        const filter = {}
        if(email) {
          filter.email = email
        }
        if(status) {
          filter.status = status
        }
        if(username) {
          filter.username = {
            [Op.like]: `%${username}%`
          };
        }
        const user = await User.scope(scop).findAndCountAll({
            where: filter,
            limit: per_page,
            offset: (page - 1) * per_page,
            order: [
                ['created_at', 'DESC']
            ]
        })
        const data = {
            data: user.rows,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: user.count,
                total: user.count,
                total_pages: Math.ceil(user.count / 10),
            }
        }
        ctx.body = data
    }
    async findById(ctx) {
        const id = ctx.params.id
        const { email, status, username } = ctx.query
        // if (!fileds) { fileds = []} 
        const scop = 'bh'
        const filter = {}
        if(email) {
            filter.email = email
          }
        if(id) {
            filter.id = id
        }
        if(status) {
            filter.status = status
        }
        if (username) {
            filter.username = {
            [Op.like]: `%${username}%`
            };
        }
        const user = await User.scope(scop).findAndCountAll({
            where: filter
        })
        if(!user) { ctx.throw(404, '用户不存在') }
      const data = {
        data: user.rows,
      }
      ctx.body = data
    }
    async updateById(ctx) {
        ctx.verifyParams({
            name: { type:  'string', required: false },
            password: { type: 'string', required: false },
            avator_url: { type: 'string', required: false},
            gender: { type: 'string', required: false},
            headline: { type: 'string', required: false},
            location: { type: 'string', itemType: 'string', required: false},
            employments: { type: 'string', itemType: 'object', required: false },
            educations: { type: 'string', itemType: 'object', required: false}
        });
        const user = await User.findByPk(ctx.params.id)
        if (!user) { ctx.throw(404, '用户不存在') }
        user.set(ctx.request.body)
        await user.save()
        ctx.body = user
    }
    async deleteById(ctx) {

        const user = await User.findOne({ where: { id: ctx.params.id }})
        if (!user) { ctx.throw(404, '用户不存在') }
        user.status = 0
        user.save()
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
        if( repeateUser ) { ctx.throw(409, '该邮箱已经注册')}
        const user = new User();
        user.username = name
        user.email = email
        user.password = password
        const res = await user.save();
        const data = {
            code: 200,
            email: res.email,
            username: res.username
        }
        ctx.body = data
    }
    async login (ctx) {
        ctx.verifyParams({
            email: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const email = ctx.request.body.email
        const password = ctx.request.body.password
        const user = await User.findOne({ where: { email, status: 1 } })
        if(!user) { ctx.throw(401, '用户名或者密码不正确')}
        const correct = bcrypt.compareSync(password, user.password)
        if(!correct) { ctx.throw(401, '用户名或者密码错误') }
        const token = jsonwebtoken.sign({ email, scope: AUTH_USER, id: user.id }, secret, { expiresIn: '1d'})
        ctx.body = {token : token}
    }
    async checkUserExist(ctx, next) {
        const user = await User.findByPk(ctx.params.id)
        if (!user) { ctx.throw(404, '用户不存在') }
        await next()
    }
    // 添加关注
    async follow(ctx) {
        const user_id = ctx.auth.id
        const followed_id = ctx.params.id
        if (user_id == followed_id) { ctx.throw(403, '不能关注自己') }
        const follow = await Follow.findOne({ where: { user_id, followed_id }})

        if (!follow) {
            const followItem = new Follow()
            followItem.user_id = user_id
            followItem.followed_id = followed_id
            await followItem.save()
        } else if (follow.status === 0) {
            follow.status = 1
            await follow.save()
        }
        ctx.status = 204
    }
    // 查询关注
    async listFollowing(ctx) {
        const followedList = await Follow.findAll({ where: { user_id: ctx.params.id, status: 1}})
        if (followedList) {
            const followedIds = followedList.map((item) => item.followed_id )
            const followed_users = await User.scope('bh').findAll({ where: { id: { [Op.in]: followedIds } }}) 
            ctx.body = followed_users
        } else {
            ctx.body = []
        }
        
    }
    // 取消关注
    async unfollow(ctx) {
        const user_id = ctx.auth.id
        const followed_id = ctx.params.id
        const followItem = await Follow.findOne({ where: { user_id, followed_id} })
        if (followItem) {
            followItem.status = 0
            followItem.save()
        }
        ctx.status = 204
    }
    // 查询粉丝
    async listFollower (ctx) {
        // 查询用户，限制条件：关注列表内有 ctx.params.id 的用户
        const followed_id = ctx.params.id
        const users = await Follow.findAll({ where: { followed_id } })
        if (users) {
            const userIds = users.map((item) => item.user_id)
            const userList = await User.scope('bh').findAll({ where: { id: { [Op.in]: userIds }}})
            ctx.body = userList
        } else{
            ctx.body = users
        }
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