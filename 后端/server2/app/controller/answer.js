const  Answer = require('../model/answers')

class AnswerssCtl {
    async findAll(ctx) {
        let { per_page = 10, page = 1 } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const reg = new RegExp(ctx.query.q)
        ctx.body = await Answer.find({ content: reg, questionId: ctx.params.questionId }).limit(per_page).skip(page * per_page)
    }
    async checkAnswerExist(ctx, next) {
        const answer = await Answer.findById(ctx.params.id).select('+answerer')
        if (!answer) { ctx.throw(404, '回答不存在')}
        // 只有在删改查答案时才检查该逻辑，赞和踩的时候不检查
        if ( ctx.params.questionId && ctx.params.questionId !== answer.questionId ) {
             ctx.throw(404, '该问题下没有此答案') 
        }
        ctx.state.answer = answer
        await next()
    }
    async findById(ctx) {
        const { fields = '' } = ctx.query
        const id = ctx.params.id
        const selectFields = fields.split(';').filter(f => f).map(f => ' +'+ f.toString()).join('')
        const answer = await Answer.findById(id).select(selectFields).populate('answerer')
        if(!answer) { ctx.throw(404, '回答不存在')}
        ctx.body = answer
    }
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true },
        })
        const data = ctx.request.body
        const answerer = ctx.state.user._id
        const questionId = ctx.params.questionId
        const answer = await new Answer({ ...data, answerer, questionId }).save()
        ctx.body = answer
    }
    async checkAnswerer(ctx, next) {
        const { answer } = ctx.state;
        if(answer.answerer.toString() !== ctx.state.user._id) { ctx.throw(403, '没有权限') }
        await next();
    }
    async updateById(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false },
        })
        await ctx.state.answer.update(ctx.request.body)
        ctx.body = ctx.state.answer
    }

    async deleteAnswer(ctx) {
        await Answer.findByIdAndRemove(ctx.params.id)
        ctx.status = 204
    }
}

module.exports = new AnswerssCtl()