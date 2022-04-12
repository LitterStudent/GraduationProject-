const  Answer = require('../model/answer')
const { Op } = require('sequelize')

class AnswerssCtl {
    async create(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true },
        })
        const { content } = ctx.request.body
        const user_id = ctx.auth.id
        const question_id = ctx.params.questionId
        const answer = await Answer.findOne({ where: { user_id, question_id }})
        if (answer) {
            ctx.throw(403, '该用户已经回答过该问题')
        } else {
            const answerItem = new Answer()
            answerItem.user_id =user_id
            answerItem.question_id = question_id
            answerItem.content = content
            await answerItem.save()
            ctx.body = answerItem
        }
    }
    async checkAnswerer(ctx, next) {
        const user_id = ctx.auth.id;
        const answer = ctx.state.answer
        if(answer.user_id!= user_id) { ctx.throw(403, '没有权限') }
        await next();
    }
    async findAll(ctx) {
        let { per_page = 10, page = 1, keyword } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const filter = { status: 1 }
        if (keyword) {
            filter.content = {
                [Op.like]: `%${keyword}%`
            }
        }
        filter.question_id = ctx.params.questionId - 0
        const AnswerList = await Answer.findAll({
             where: filter,
             limit: per_page,
             offset: page * per_page,
             order: [
                 ['created_at', 'DESC']
             ]
            })
        ctx.body = AnswerList
    }
    async checkAnswerExist(ctx, next) {
        const answer = await Answer.findByPk(ctx.params.id)
        if (!answer || answer.status != 1) { ctx.throw(404, '回答不存在')}
        // 只有在删改查答案时才检查该逻辑，赞和踩的时候不检查
        // if ( ctx.params.questionId && ctx.params.questionId !== answer.questionId ) {
        //      ctx.throw(404, '该问题下没有此答案') 
        // }
        ctx.state.answer = answer
        await next()
    }
    async checkAnswerExist2(ctx, next) {
        const answer = await Answer.findByPk(ctx.params.id)
        if (!answer || answer.status == 0) { ctx.throw(404, '回答不存在')}
        // 只有在删改查答案时才检查该逻辑，赞和踩的时候不检查
        // if ( ctx.params.questionId && ctx.params.questionId !== answer.questionId ) {
        //      ctx.throw(404, '该问题下没有此答案') 
        // }
        ctx.state.answer = answer
        await next()
    }
    async findById(ctx) {
        const answer = ctx.state.answer
        ctx.body = answer
    }
    async updateById(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: false },
        })
        const { content } = ctx.request.body
        const answer = ctx.state.answer
        answer.content = content
        answer.status = 2
        await answer.save()
        ctx.body = answer
    }
    async deleteAnswer(ctx) {
        const answer = ctx.state.answer
        answer.status = 0
        await answer.save()
        ctx.status = 204
    }
}

module.exports = new AnswerssCtl()