const Comment = require("../model/comment");
const CommentReply = require("../model/commentReply");
const User = require("../model/user");
const { Op } = require("sequelize");
const Answer = require("../model/answer");

class CommentCtl {
  async createComment(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
    });
    const comment = new Comment();
    // 判断是文章还是回答的评论
    if (ctx.state.article) {
      comment.type = 0;
      const article = ctx.state.article;
      article.comment_num = article.comment_num + 1;
      await article.save();
    } else if (ctx.state.answer) {
      comment.type = 1;
      const answer = ctx.state.answer;
      answer.comment_num = answer.comment_num + 1;
      await answer.save();
    }
    const user_id = ctx.auth.id;
    const answer_id = ctx.params.id;
    const content = ctx.request.body.content;
    comment.user_id = user_id;
    comment.answer_id = answer_id;
    comment.content = content;
    await comment.save();
    const user = await User.scope("bh").findByPk(user_id);
    const commentCopy = comment["dataValues"];
    commentCopy["user"] = user;
    ctx.body = comment;
  }
  async deleteComment(ctx) {
    const comment = ctx.state.comment;
    if (comment.status != 0) {
      comment.status = 0;
      await comment.save();
      const answer = await Answer.findByPk(comment.answer_id);
      answer.comment_num--;
      await answer.save();
    }
    ctx.status = 204;
  }
  async checkCommentExist(ctx, next) {
    const comment = await Comment.findByPk(ctx.params.id);
    if (!comment) {
      ctx.throw(403, "没有该评论");
    }
    ctx.state.comment = comment;
    await next();
  }
  async checkCommenter(ctx, next) {
    const user_id = ctx.auth.id;
    const comment = ctx.state.comment;
    if (comment.user_id != user_id) {
      ctx.throw(403, "没有权限删除评论");
    }
    await next();
  }
  async createRelpy(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
      reply_user_id: { type: "string", required: true },
    });
    const comment = ctx.state.comment;
    const user_id = ctx.auth.id;
    const comment_id = comment.id;
    const answer_id = comment.answer_id;
    const { content, reply_user_id } = ctx.request.body;
    const reply = new CommentReply();
    reply.set({ user_id, comment_id, answer_id, content, reply_user_id });
    await reply.save();
    const user = await User.scope("bh").findByPk(user_id);
    const commentReplyCopy = reply["dataValues"];
    commentReplyCopy["user"] = user;
    ctx.body = commentReplyCopy;
  }
  // 回答一级评论列表
  async findAll(ctx) {
    const answer_id = ctx.params.id;
    let { per_page = 10, page = 1 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1, answer_id, type: 1 };
    // 一级评论列表
    const commentList = await Comment.findAll({
      where: filter,
      //  limit: per_page,
      //  offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    const commentListCopy = commentList.map((item) => {
      return item["dataValues"];
    });
    const userIds = commentList.map((item) => item.user_id);
    const userList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
    const userMap = {};
    userList.forEach((item) => {
      userMap[item.id] = item;
    });
    for (const item of commentListCopy) {
      item["user"] = userMap[item.user_id];
    }
    ctx.body = commentListCopy;
  }
  // 文章一级评论列表
  async findAll2(ctx) {
    const answer_id = ctx.params.id;
    let { per_page = 10, page = 1 } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1, answer_id, type: 0 };
    // 一级评论列表
    const commentList = await Comment.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    const commentListCopy = commentList.map((item) => {
      return item["dataValues"];
    });
    const userIds = commentList.map((item) => item.user_id);
    const userList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
    const userMap = {};
    userList.forEach((item) => {
      userMap[item.id] = item;
    });
    for (const item of commentListCopy) {
      item["user"] = userMap[item.user_id];
    }
    ctx.body = commentListCopy;
  }
  // 二级评论
  async findAllReply(ctx) {
    const comment_id = ctx.params.id;
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1, comment_id };
    // 一级评论列表
    const commentReplyList = await CommentReply.findAll({
      where: filter,
      //   limit: per_page,
      //   offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    const commentReplyListCopy = commentReplyList.map((item) => {
      return item["dataValues"];
    });
    const userIds = commentReplyList.map((item) => item.user_id);
    const userList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
    const userMap = {};
    userList.forEach((item) => {
      userMap[item.id] = item;
    });
    const replyUserIds = commentReplyList.map((item) => item.reply_user_id);
    const replyUserList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: replyUserIds,
        },
      },
    });
    const replyUserMap = {};
    replyUserList.forEach((item) => {
      replyUserMap[item.id] = item;
    });
    for (const item of commentReplyListCopy) {
      item["user"] = userMap[item.user_id];
      item["reply_user"] = replyUserMap[item.reply_user_id];
    }
    ctx.body = commentReplyList;
  }
}

module.exports = new CommentCtl();
