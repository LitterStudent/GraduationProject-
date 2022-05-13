const Topic = require("../model/topic");
const User = require("../model/user");
const FollowTopic = require("../model/followTopic");
const Question = require("../model/question");
const { Op } = require("sequelize");
const Answer = require("../model/answer");
const Article = require("../model/article");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
class TopicsCtl {
  async findAll(ctx) {
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = {};
    if (keyword) {
      filter.topic_name = {
        [Op.like]: `%${keyword}%`,
      };
    }
    ctx.body = await Topic.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
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
      topic_name,
      status,
      introduction,
    } = ctx.query;
    const scop = "bh";
    per_page = per_page - 0;
    page = page - 0;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (topic_name) {
      filter.topic_name = {
        [Op.like]: `%${topic_name}%`,
      };
    }
    if (introduction) {
      filter.introduction = {
        [Op.like]: `%${introduction}%`,
      };
    }
    const topic = await Topic.findAndCountAll({
      where: filter,
      limit: per_page,
      offset: (page - 1) * per_page,
      order: [["created_at", "ASC"]],
    });
    const topic2 = await Topic.findAndCountAll();
    const data = {
      data: topic.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: topic.count,
        total: topic2.count,
        total_pages: Math.ceil(topic2.count / 10),
      },
    };
    ctx.body = data;
  }
  async findById(ctx) {
    const id = ctx.params.id;
    const topic = await Topic.findByPk(id);
    if (!topic) {
      ctx.throw(404, "话题不存在");
    }
    ctx.body = topic;
  }
  async create(ctx) {
    ctx.verifyParams({
      topic_name: { type: "string", required: true },
      avatar_url: { type: "string", required: false },
      introduction: { type: "string", required: false },
    });
    const repeateTopic = await Topic.findOne({
      where: {
        topic_name: ctx.request.body.topic_name,
      },
    });
    if (repeateTopic) {
      ctx.throw(409, "该主题名已经存在");
    }
    const data = ctx.request.body;
    data.created_admin = ctx.auth.id;
    const topic = await new Topic(data).save();
    ctx.body = topic;
  }
  async deletetopic(ctx) {
    const topic_id = ctx.params.id;
    const topic = await Topic.findByPk(topic_id);
    topic.status = 0;
    topic.save();
    ctx.body = topic;
  }
  async undeletetopic(ctx) {
    const topic_id = ctx.params.id;
    const topic = await Topic.findByPk(topic_id);
    topic.status = 1;
    topic.save();
    ctx.body = topic;
  }
  async updateById(ctx) {
    ctx.verifyParams({
      topic_name: { type: "string", required: false },
      avatar_url: { type: "string", required: false },
      introduction: { type: "string", required: false },
    });
    const topic = await Topic.findOne({ where: { id: ctx.params.id } });
    const { topic_name, avatar_url, introduction } = ctx.request.body;
    if (topic_name) {
      topic.topic_name = topic_name;
    }
    if (avatar_url) {
      topic.avatar_url = avatar_url;
    }
    if (introduction) {
      topic.introduction = introduction;
    }
    await topic.save();
    ctx.body = topic;
  }
  async checkTopicExist(ctx, next) {
    const topic = await Topic.findByPk(ctx.params.id);
    if (!topic) {
      ctx.throw(404, "话题不存在");
    }
    await next();
  }
  async listFollowers(ctx) {
    const followTopicList = await FollowTopic.findAll({
      where: { topic_id: ctx.params.id },
    });
    const userids = followTopicList.map((item) => item.user_id);
    const users = await User.scope("bh").findAll({
      where: { id: { [Op.in]: userids } },
    });
    ctx.body = users;
  }
  async listQuestions(ctx) {
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = {};
    if (keyword) {
      filter.topic_name = {
        [Op.like]: `%${keyword}%`,
      };
    }
    filter.topic_id = ctx.params.id;
    ctx.body = await Question.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
  }
  // 获取话题下的内容
  async getTopicContent(ctx) {
    let { per_page = 10, page = 1 } = ctx.query;
    per_page = per_page - 0;
    page = page - 0;
    const topic_id = ctx.params.id;
    const topictoquestionList = await Question.findAll({
      where: {
        topic_id,
      },
    });
    const topictoquestionIds = topictoquestionList.map((item) => item.id);
    const answer = await Answer.findAll({
      where: {
        status: 1,
        question_id: {
          [Op.in]: topictoquestionIds,
        },
      },
      order: [["favorite_num", "DESC"]],
      offset: per_page * (page - 1),
      limit: per_page,
    });
    const article = await Article.findAll({
      where: {
        status: 1,
        topic_id,
      },
      order: [["favorite_num", "DESC"]],
      offset: 2 * (page - 1),
      limit: 2,
    });
    const res = [];
    const userIds = [];
    const questionIds = [];
    answer.forEach((item) => {
      const dom = new JSDOM(item.content);
      item["dataValues"]["content"] =
        dom.window.document.body.textContent.substring(0, 100) + "...";
      res.push(item);
      userIds.push(item.user_id);
      questionIds.push(item.question_id);
    });
    article.forEach((item) => {
      const dom = new JSDOM(item.content);
      item["dataValues"]["content"] =
        dom.window.document.body.textContent.substring(0, 160) + "...";
      userIds.push(item.user_id);
    });
    const userList = await User.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
    const questionList = await Question.findAll({
      where: {
        id: {
          [Op.in]: questionIds,
        },
      },
    });
    const userMap = {};
    const questionMap = {};
    userList.forEach((item) => {
      userMap[item.id] = item;
    });
    questionList.forEach((item) => {
      questionMap[item.id] = item;
    });
    answer.forEach((item) => {
      item["dataValues"]["user_name"] = userMap[item.user_id]["username"];
      item["dataValues"]["title"] =
        questionMap[item.question_id]["question_name"];
    });
    article.forEach((item) => {
      item["dataValues"]["user_name"] = userMap[item.user_id]["username"];
    });
    if (article[0]) {
      res.splice(4, 0, article[0]);
    }
    if (article[1]) {
      res.splice(8, 0, article[1]);
    }
    ctx.body = res;
  }
}

module.exports = new TopicsCtl();
