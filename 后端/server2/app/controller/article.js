const Answer = require("../model/answer");
const { Op } = require("sequelize");
const Article = require("../model/article");
const User = require("../model/user");
const Topic = require("../model/topic");
const ColumnArticle = require("../model/column_article");
const Column = require("../model/column");

class AnswerssCtl {
  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
      topic_id: { type: "string", required: true },
      title: { type: "string", required: true },
      cover_url: { type: "string", required: false },
    });
    const { content, title, cover_url, topic_id, column_id } = ctx.request.body;
    const user_id = ctx.auth.id;
    const article = new Article();
    const articleInit = { content, title, topic_id, user_id, topic_id };
    if (cover_url) {
      articleInit.cover_url = cover_url;
    }
    if (column_id) {
      articleInit.column_id = column_id;
    }
    article.set(articleInit);
    await article.save();
    if (column_id) {
      const column_article = new ColumnArticle();
      column_article.column_id = column_id;
      column_article.article_id = article.id;
      await column_article.save();
    }
    ctx.body = article;
  }
  async checkWriter(ctx, next) {
    const user_id = ctx.auth.id;
    const answer = ctx.state.article;
    if (answer.user_id != user_id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  }
  async findAll(ctx) {
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1 };
    if (keyword) {
      filter.content = {
        [Op.like]: `%${keyword}%`,
      };
    }
    filter.question_id = ctx.params.questionId - 0;
    const AnswerList = await Answer.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    ctx.body = AnswerList;
  }
  async checkArticleExist(ctx, next) {
    let id = undefined;
    if (ctx.params.id) {
      id = ctx.params.id;
    } else if (ctx.params.article_id) {
      id = ctx.params.article_id;
    }
    const article = await Article.findByPk(id);
    if (!article || article.status == 0) {
      ctx.throw(404, "文章不存在");
    }
    // 只有在删改查答案时才检查该逻辑，赞和踩的时候不检查
    // if ( ctx.params.questionId && ctx.params.questionId !== answer.questionId ) {
    //      ctx.throw(404, '该问题下没有此答案')
    // }
    ctx.state.article = article;
    await next();
  }
  async findById(ctx) {
    const id = ctx.params.id;
    const article = await Article.findByPk(id);
    if (!article) {
      ctx.throw(404, "文章不存在");
    }
    const user_id = ctx.auth.id;
    if (article.status == 2 && article.user_id !== user_id) {
      ctx.throw(403, "该文章待审核，除了作者不能查看");
    }
    const user = await User.scope("bh").findByPk(article.user_id);
    const topic = await Topic.scope("bh").findOne({
      where: {
        id: article.topic_id,
      },
      attributes: {
        exclude: ["introduction", "avatar_url", "created_admin"],
      },
    });
    const res = article.dataValues;
    res.user = user.dataValues;
    res.topic = topic.dataValues;
    const column_article = await ColumnArticle.findOne({
      where: {
        article_id: article.id,
      },
    });
    if (column_article) {
      const column = await Column.findByPk(column_article.column_id);
      res.column = column;
    }
    ctx.body = res;
  }
  async updateById(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
      topic_id: { type: "string", required: true },
      title: { type: "string", required: true },
      cover_url: { type: "string", required: false },
    });
    const { content, title, cover_url, topic_id, column_id } = ctx.request.body;
    const user_id = ctx.auth.id;
    const article = ctx.state.article;
    const articleInit = {
      content,
      title,
      topic_id,
      user_id,
      topic_id,
      status: 2,
    };
    if (cover_url) {
      articleInit.cover_url = cover_url;
    }
    if (column_id) {
      articleInit.column_id = column_id;
    }
    article.set(articleInit);
    await article.save();
    ctx.body = article;
  }
  async deleteArticle(ctx) {
    const article = ctx.state.article;
    article.status = 0;
    await article.save();
    ctx.status = 204;
  }
  async getUserAllArticle(ctx) {
    const user_id = ctx.params.id;
    const login_user_id = ctx.auth.id;
    const status = [1];
    if (login_user_id == user_id) {
      status.push(2);
    }
    const articleList = await Article.findAll({
      where: {
        user_id,
        status,
      },
      order: [["created_at", "DESC"]],
    });
    ctx.body = articleList;
  }
}

module.exports = new AnswerssCtl();
