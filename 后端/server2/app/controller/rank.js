const Topic = require("../model/topic");
const User = require("../model/user");
const FollowTopic = require("../model/followTopic");
const Question = require("../model/question");
const { Op } = require("sequelize");
const Rank = require("../model/rank");
const Admin = require("../model/admin");
class TopicsCtl {
  async findAll(ctx) {
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1 };
    if (keyword) {
      filter.topic_name = {
        [Op.like]: `%${keyword}%`,
      };
    }
    ctx.body = await Rank.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["ranl_num", "DESC"]],
    });
  }
  async adminfindAll(ctx) {
    // select 可以让select为false 的字段显示出来
    // ctx.body = await User.find().select('password').select('name')
    // const { fileds } = ctx.query || []
    // const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
    let {
      per_page = 10,
      page = 1,
      question_name,
      status,
      rank_num,
    } = ctx.query;
    per_page = per_page - 0;
    page = page - 0;
    const filter = {};
    if (status) {
      filter.status = status;
    }

    if (question_name) {
      const questionList = await Question.findAll({
        where: {
          question_name: {
            [Op.like]: `%${question_name}%`,
          },
        },
      });
      const questionIds = questionList.map((item) => item.id);
      filter.question_id = {
        [Op.in]: questionIds,
      };
    }
    if (rank_num) {
      filter.rank_num = rank_num;
    }

    const rank = await Rank.findAll({
      where: filter,
      limit: per_page,
      offset: (page - 1) * per_page,
      order: [["rank_num", "ASC"]],
    });
    let questionMap = {};
    const questionIds = rank.map((item) => {
      return item.question_id;
    });
    const questionList = await Question.findAll({
      where: {
        id: {
          [Op.in]: questionIds,
        },
      },
    });
    questionList.forEach((item) => {
      questionMap[item.id] = item;
    });
    const rankcopy = rank.map((item) => {
      item["dataValues"]["question_name"] =
        questionMap[item.question_id]["question_name"];
      return item["dataValues"];
    });
    const rank2 = await Rank.findAndCountAll();
    const data = {
      data: rankcopy,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: rankcopy.length,
        total: rank2.count,
        total_pages: Math.ceil(rank2.count / 10),
      },
    };
    ctx.body = data;
  }
  async findById(ctx) {
    const id = ctx.params.id;
    const rank = await Rank.findByPk(id);
    if (!rank) {
      ctx.throw(404, "排行项不存在");
    }
    ctx.body = topic;
  }
  async create(ctx) {
    // ctx.verifyParams({
    //   question_name: { type: "string", required: true },
    //   rank_num: { type: "string", required: false },
    //   cover_url: { type: "string", required: false },
    // });
    const { rank_num, cover_url, question_name } = ctx.request.body;
    const repeateRank = await Rank.findOne({
      where: {
        rank_num,
      },
    });
    if (repeateRank) {
      ctx.throw(403, "该排名已经存在");
    }
    const rank = new Rank();
    rank.rank_num = rank_num;
    rank.cover_url = cover_url;
    const question = await Question.findOne({
      where: {
        question_name,
      },
    });
    const repeateRank2 = await Rank.findOne({
      where: {
        question_id: question.id,
      },
    });
    if (repeateRank2) {
      ctx.throw(403, "该问题已经被设置");
    }
    rank.admin_id = ctx.auth.id;
    rank.question_id = question.id;
    const res = await rank.save();
    ctx.body = res;
  }
  async deleterank(ctx) {
    const rank_id = ctx.params.id;
    const rank = await Rank.findByPk(rank_id);
    rank.status = 0;
    rank.save();
    ctx.body = rank;
  }
  async undeleterank(ctx) {
    const rank_id = ctx.params.id;
    const rank = await Rank.findByPk(rank_id);
    const repeatedRank = await Rank.findOne({
      where: {
        rank_num: rank.rank_num,
        status: 1,
      },
    });
    if (repeatedRank) {
      ctx.throw(403, "该排行数已被占用");
    } else {
      rank.status = 1;
      rank.save();
      ctx.body = rank;
    }
  }
  async updateById(ctx) {
    // ctx.verifyParams({
    //   question_name: { type: "string", required: true },
    //   rank_num: { type: "number", required: false },
    //   cover_url: { type: "string", required: false },
    // });
    const rank = await Rank.findOne({ where: { id: ctx.params.id } });
    const { question_name, rank_num, cover_url } = ctx.request.body;
    if (question_name) {
      const question = await Question.findOne({
        where: {
          question_name,
        },
      });
      const rankRepeat = await Rank.findOne({
        where: {
          question_id: question.id,
        },
      });
      if (rankRepeat && rankRepeat.id != rank.id) {
        ctx.throw(403, "该问题已经被设置在排行榜上");
      }
      rank.question_id = question.id;
    }
    if (rank_num) {
      const rankRepeat = await Rank.findOne({
        where: {
          rank_num,
          status: 1,
        },
      });
      if (rankRepeat && rankRepeat.id != rank.id) {
        ctx.throw(403, "该排名已经被设置在排行榜上");
      }
      rank.rank_num = rank_num;
    }
    if (cover_url) {
      rank.cover_url = cover_url;
    }
    await rank.save();
    ctx.body = rank;
  }
  async checkRankExist(ctx, next) {
    const rank = await Rank.findByPk(ctx.params.id);
    if (!rank) {
      ctx.throw(404, "排行项不存在");
    }
    await next();
  }
}

module.exports = new TopicsCtl();
