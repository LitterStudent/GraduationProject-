const  Question = require('../model/questions')

class QuestionsCtl {
    async findAll(ctx) {
        let { per_page = 10, page = 1 } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const reg = new RegExp(ctx.query.q)
        ctx.body = await Question.find({ $or: [{ title: reg }, { description: reg }]}).limit(per_page).skip(page * per_page)
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query
        const id = ctx.params.id
        const selectFields = fields.split(';').filter(f => f).map(f => ' +'+ f.toString()).join('')
        const question = await Question.findById(id).select(selectFields).populate('questioner topics')
        if(!question) { ctx.throw(404, '问题不存在')}
        ctx.body = question
    }
    async create(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            description: { type: 'string', required: false },
        })
        const data = ctx.request.body
        const question = await new Question({ ...data, questioner: ctx.state.user._id}).save()
        ctx.body = question
    }
    async updateById(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: false },
            description: { type: 'string', required: false },
        })
        await ctx.state.question.update(ctx.request.body)
        ctx.body = ctx.state.question
    }
    async checkQuestionExist(ctx, next) {
        const question = await Question.findById(ctx.params.id).select('+questioner')
        if (!question) { ctx.throw(404, '问题不存在')}
        ctx.state.question = question
        await next()
    }
    async deleteQuestion(ctx) {
        await Question.findByIdAndRemove(ctx.params.id)
        ctx.status = 204
    }
    async checkQuestioner(ctx, next) {
        const { question } = ctx.state;
        if(question.questioner.toString() !== ctx.state.user._id) { ctx.throw(403, '没有权限') }
        await next();
    }
}

module.exports = new QuestionsCtl()