const { Op } = require("sequelize");
const Article = require("../model/article");
const User = require("../model/user");
const Column = require("../model/column");
const ColumnArticle = require("../model/column_article");
const FollowColumn = require("../model/followColumn");
class ColumnCtl {
  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      description: { type: "string", required: true },
    });
    const { title, description } = ctx.request.body;
    const user_id = ctx.auth.id;
    const column = new Column();
    const articleInit = { title, description, user_id };
    column.set(articleInit);
    await column.save();
    ctx.body = column;
  }
  async checkColumner(ctx, next) {
    const user_id = ctx.auth.id;
    const column = ctx.state.column;
    if (column.user_id != user_id) {
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
    const ColumnList = await Column.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    ctx.body = ColumnList;
  }
  async checkColumnExist(ctx, next) {
    let id = "";
    if (ctx.params.column_id) {
      id = ctx.params.column_id;
    } else if (ctx.params.id) {
      id = ctx.params.id;
    }
    const column = await Column.findByPk(id);
    if (!column || column.status != 1) {
      ctx.throw(404, "专栏不存在");
    }
    ctx.state.column = column;
    await next();
  }
  async findById(ctx) {
    const id = ctx.params.id;
    const column = await Column.findByPk(id);
    if (!column || column.status == 0) {
      ctx.throw(404, "专栏不存在");
    }
    const user = await User.scope("bh").findByPk(column.user_id);
    const res = column.dataValues;
    res.user = user.dataValues;
    ctx.body = res;
  }
  async findArticleByColumn(ctx) {
    const column_id = ctx.params.id;
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1, column_id };
    if (keyword) {
      filter.content = {
        [Op.like]: `%${keyword}%`,
      };
    }
    const column = await Column.findByPk(column_id);
    const user = await User.scope("bh").findByPk(column.user_id);
    const ColumnArticleList = await ColumnArticle.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    const articleIds = ColumnArticleList.map((item) => item.article_id);
    const articleList = await Article.findAll({
      where: {
        id: {
          [Op.in]: articleIds,
        },
      },
    });
    ctx.body = { articleList, user, column };
  }
  async findArticleNoInColumn(ctx) {
    const column_id = ctx.params.id;
    const user_id = ctx.auth.id;
    const articleList = await Article.findAll({
      where: { user_id, status: 1 },
    });
    const columnArticleList = await ColumnArticle.findAll({
      where: { column_id, status: 1 },
    });
    const res = articleList.filter(
      (item) => !columnArticleList.find((item2) => item2.article_id == item.id)
    );
    ctx.body = res;
  }
  async findByUserId(ctx) {
    const user_id = ctx.params.id;
    const columnList = await Column.findAll({
      where: { user_id, status: 1 },
      order: [["created_at", "DESC"]],
    });
    ctx.body = columnList;
  }
  async updateById(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      description: { type: "string", required: false },
    });
    const { description, title } = ctx.request.body;
    const column = ctx.state.column;
    const columnInit = { description, title };
    column.set(columnInit);
    await column.save();
    ctx.body = column;
  }
  async deleteArticle(ctx) {
    const column = ctx.state.column;
    column.status = 0;
    await column.save();
    ctx.status = 204;
  }
  // 将文章添加到专栏
  async addingColumn(ctx) {
    const column_id = ctx.params.column_id;
    const article_id = ctx.params.article_id;
    const column_article_one = await ColumnArticle.findOne({
      where: {
        column_id,
        article_id,
      },
    });
    if (!column_article_one) {
      const column_article = new ColumnArticle();
      column_article.column_id = column_id;
      column_article.article_id = article_id;
      await column_article.save();
      ctx.status = 200;
    } else {
      column_article_one.status = 1;
      await column_article_one.save();
      ctx.status = 200;
    }
  }
  // 将文章从专栏删除
  async deleteFromColumn(ctx) {
    const article_id = ctx.params.article_id;
    const column_id = ctx.params.column_id;
    const column_article = await ColumnArticle.findOne({
      where: { article_id, column_id },
    });
    column_article.status = 0;
    await column_article.save();
    ctx.status = 204;
  }

  // 查找用户关注的专栏
  async getUserFollowingColumn(ctx) {
    const user_id = ctx.params.id;
    const followColumnList = await FollowColumn.findAll({
      where: {
        user_id,
        status: 1,
      },
    });
    const columnIds = followColumnList.map((item) => item.column_id);
    const columnList = await Column.findAll({
      where: {
        id: {
          [Op.in]: columnIds,
        },
      },
    });
    ctx.body = columnList;
  }

  //   关注专栏
  async followColumn(ctx) {
    const column = ctx.state.column;
    const user_id = ctx.auth.id;
    const followColumn = await FollowColumn.findOne({
      where: {
        user_id,
        column_id: column.id,
      },
    });
    if (!followColumn) {
      const follow_column2 = new FollowColumn();
      follow_column2.user_id = user_id;
      follow_column2.column_id = column.id;
      await follow_column2.save();
    } else {
      followColumn.status = 1;
      await followColumn.save();
    }
    ctx.status = 200;
  }
  //   取消关注专栏
  async unfollowColumn(ctx) {
    const column = ctx.state.column;
    const user_id = ctx.auth.id;
    const followColumn = await FollowColumn.findOne({
      where: {
        user_id,
        column_id: column.id,
      },
    });
    if (followColumn) {
      followColumn.status = 0;
      await followColumn.save();
    }
    ctx.status = 200;
  }
}

module.exports = new ColumnCtl();
