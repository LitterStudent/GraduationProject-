const  Topic =  require('../model/topics')
const User = require('../model/user')
const Question = require('../model/questions')
class TopicsCtl {
    async findAll(ctx) {
        let { per_page = 10, page = 1 } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        ctx.body = await Topic.find({name: new RegExp(ctx.query.q)}).limit(per_page).skip(page * per_page)
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query
        const id = ctx.params.id
        const selectFields = fields.split(';').filter(f => f).map(f => ' +'+ f.toString()).join('')
        const topic = await Topic.findById(id).select(selectFields)
        if(!topic) { ctx.throw(404, '话题不存在')}
        ctx.body = topic
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false }
        })
        const data = ctx.request.body
        const topic = await new Topic(data).save()
        ctx.body = topic
    }
    async updateById(ctx) {
        ctx.verifyParams({
            // name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false },
            introduction: { type: 'string', required: false }
        })
        const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        ctx.body = topic
    }
    async checkTopicExist(ctx, next) {
        const topic = await Topic.findById(ctx.params.id)
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