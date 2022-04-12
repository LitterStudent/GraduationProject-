const Comment = require('../model/comment')
const Reply = require('../model/commentReply')
class CommentCtl {
    async createComment(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true },

        })
        const user_id = ctx.auth.id
        const answer_id = ctx.params.id
        const content = ctx.request.body.content
        const comment = new Comment()
        comment.user_id = user_id
        comment.answer_id = answer_id
        comment.content = content
        await comment.save()
        ctx.body = comment
    }
    async deleteComment(ctx) {
        const comment = ctx.state.comment
        if (comment.status != 0) {
            comment.status = 0
            await comment.save()
        }
        ctx.status = 204
    }
    async checkCommentExist(ctx, next) {
        const comment = await Comment.findByPk(ctx.params.id)
        if( !comment) { ctx.throw(403, '没有该评论')}
        ctx.state.comment = comment
        await next()
    }
    async checkCommenter(ctx, next) {
        const user_id = ctx.auth.id
        const comment = ctx.state.comment
        if( comment.user_id != user_id) { ctx.throw(403, '没有权限删除评论')}
        await next()
    }
    async createRelpy(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true}
        })
        const comment = ctx.state.comment
        const user_id = ctx.auth.id
        const comment_id = comment.id
        const answer_id = comment.answer_id
        const { content } = ctx.request.body
        const reply = new Reply()
        reply.set({ user_id, comment_id, answer_id, content})
        await reply.save()
        ctx.status = 204
    }
}

module.exports = new CommentCtl()