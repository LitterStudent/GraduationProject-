const  Topic =  require('../model/topic')
const User = require('../model/user')
const Question = require('../model/questions')
const { Op } = require('sequelize')
class TopicsCtl {
    async findAll(ctx) {
        let { per_page = 10, page = 1, keyword } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const filter = {}
        if (keyword) {
            filter.topic_name = {
                [Op.like]: `%${keyword}%`
            }
        }
        ctx.body = await Topic.findAll({
             where: filter,
             limit: per_page,
             offset: page * per_page,
             order: [
                 ['created_at', 'DESC']
             ]
            })
    }
    async findById(ctx) {
        const id = ctx.params.id
        const topic = await Topic.findByPk(id)
        if(!topic) { ctx.throw(404, '话题不存在')}
        ctx.body = topic
    }
    async create(ctx) {
        ctx.verifyParams({
            topic_name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false }
        })
        const repeateTopic = await Topic.findOne({
            where: {
                topic_name: ctx.request.body.topic_name
            }
            })
       if( repeateTopic ) { ctx.throw(409, '该主题名已经存在')}
        const data = ctx.request.body
        data.created_admin = ctx.auth.id
        const topic = await new Topic(data).save()
        ctx.body = topic
    }
    async updateById(ctx) {
        ctx.verifyParams({
            topic_name: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false }
        })
        const topic = await Topic.findOne({ where: { id: ctx.params.id }})
        const { topic_name, avatar_url, introduction } = ctx.request.body
        if (topic_name) {
            topic.topic_name = topic_name
        }
        if (avatar_url) {
            topic.avatar_url = avatar_url
        }
        if (introduction) {
            topic.introduction = introduction
        }
        await topic.save()
        ctx.body = topic
    }
    async checkTopicExist(ctx, next) {
        const topic = await Topic.findByPk(ctx.params.id)
        if (!topic) { ctx.throw(404, '话题不存在')}
        await next()
    }
    async listFollowers (ctx) {
        const users = await User.find({ followingTopics: ctx.params.id })
        ctx.body = users
    }
    async listQuestions(ctx) {
        const questions = await Question.find({ topics: ctx.params.id })
        ctx.body = questions
    } 
}

module.exports = new TopicsCtl()