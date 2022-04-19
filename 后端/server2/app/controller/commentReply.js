const CommentReply = require('../model/commentReply')
const User = require('../model/user')
const { Op } = require('sequelize')
class CommentReplyCtl {
    async createRelpy(ctx) {
        ctx.verifyParams({
            content: { type: 'string', required: true },
            reply_user_id: { type: 'string', required: true }
        })
        const comment = ctx.state.comment
        const user_id = ctx.auth.id
        const comment_id = comment.id
        const answer_id = comment.answer_id
        const { content, reply_user_id} = ctx.request.body
        const reply = new CommentReply()
        reply.set({ user_id, comment_id, answer_id, content, reply_user_id})
        await reply.save()
        ctx.status = 204
    }
    // 二级评论
    async findAllReply(ctx) {
        const comment_id = ctx.params.id
        let { per_page = 10, page = 1, keyword } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const filter = { status: 1, comment_id }
        // 一级评论列表
        const commentReplyList = await CommentReply.findAll({
             where: filter,
             limit: per_page,
             offset: page * per_page,
             order: [
                 ['created_at', 'DESC']
             ]
            })
        const commentReplyListCopy = commentReplyList.map(item => {
            return item['dataValues']
        })
        const userIds = commentReplyList.map(item => item.user_id)
        const userList = await User.scope('bh').findAll({
            where: {
               id: {
                [Op.in]: userIds
               }
            }
        })
        const userMap = {}
        userList.forEach(item => {
            userMap[item.id] = item
        })
        const replyUserIds = commentReplyList.map(item => item.reply_user_id)
        const replyUserList = await User.scope('bh').findAll({
            where: {
               id: {
                [Op.in]: replyUserIds
               }
            }
        })
        const replyUserMap = {}
        replyUserList.forEach(item => {
            replyUserMap[item.id] = item
        })
        for (const item of commentReplyListCopy) {
            item['user'] = userMap[item.user_id]
            item['reply_user'] = replyUserMap[item.reply_user_id]
        }
        ctx.body = commentReplyList
    }
    async findOneAnswerAllReply(ctx) {
        const answer_id = ctx.params.id
        let { per_page = 10, page = 1, keyword } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const filter = { status: 1, answer_id }
        // 一级评论列表
        const commentReplyList = await CommentReply.findAll({
             where: filter,
            //  limit: per_page,
            //  offset: page * per_page,
             order: [
                 ['created_at', 'DESC']
             ]
            })
        const commentReplyListCopy = commentReplyList.map(item => {
            return item['dataValues']
        })
        const userIds = commentReplyList.map(item => item.user_id)
        const userList = await User.scope('bh').findAll({
            where: {
               id: {
                [Op.in]: userIds
               }
            }
        })
        const userMap = {}
        userList.forEach(item => {
            userMap[item.id] = item
        })
        const replyUserIds = commentReplyList.map(item => item.reply_user_id)
        const replyUserList = await User.scope('bh').findAll({
            where: {
               id: {
                [Op.in]: replyUserIds
               }
            }
        })
        const replyUserMap = {}
        replyUserList.forEach(item => {
            replyUserMap[item.id] = item
        })
        for (const item of commentReplyListCopy) {
            item['user'] = userMap[item.user_id]
            item['reply_user'] = replyUserMap[item.reply_user_id]
        }
        ctx.body = commentReplyList
    }
    async checkReplyCommenter(ctx, next) {
        const user_id = ctx.auth.id
        const commentReply = ctx.state.commentReply
        if (commentReply.user_id != user_id) {
            ctx.throw(403, '没有权限修改评论')
        }
        await next()
    }
    async deleteReplyComment(ctx) {
        const replyComment = ctx.state.commentReply
        replyComment.status = 0
        await replyComment.save()
        ctx.status = 204
    }
    async checkReplyCommentExist(ctx, next) {
        const id = ctx.params.replyid
        const commentReply = await CommentReply.findByPk(id)
        if (!commentReply) { ctx.throw(404, '不存在该评论')}
        ctx.state.commentReply = commentReply
        await next()
    }
}

module.exports = new CommentReplyCtl()