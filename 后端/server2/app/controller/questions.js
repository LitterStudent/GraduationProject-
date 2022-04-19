const Question = require("../model/question");
const { Op } = require("sequelize");
const Topic = require("../model/topic");
const FollowQuestion = require("../model/followQuestion");
class QuestionsCtl {
  async findAll(ctx) {
    let { per_page = 10, page = 1, keyword } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = { status: 1 };
    if (keyword) {
      filter.question_name = {
        [Op.like]: `%${keyword}%`,
      };
    }
    ctx.body = await Question.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
  }
  async findById(ctx) {
    const id = ctx.params.id;
    const question = await Question.findByPk(id);
    if (!question || question.status != 1) {
      ctx.throw(404, "问题不存在");
    }
    const topic_id = question.topic_id;
    const topic = await Topic.findByPk(topic_id);
    ctx.body = { question, topic };
  }
  async create(ctx) {
    ctx.verifyParams({
      question_name: { type: "string", required: true },
      description: { type: "string", required: false },
      topic_id: { type: "string", require: true },
    });
    const { question_name, description, topic_id } = ctx.request.body;
    const created_user = ctx.auth.id;
    const question = new Question();
    question.created_user = created_user;
    question.question_name = question_name;
    question.topic_id = topic_id - 0;
    if (description) {
      question.description = description;
    }
    await question.save();
    ctx.body = question;
  }
  async updateById(ctx) {
    ctx.verifyParams({
      question_name: { type: "string", required: false },
      description: { type: "string", required: false },
    });
    const { question_name, description } = ctx.request.body;
    const question = ctx.state.question;
    if (question_name) {
      question.question_name = question_name;
    }
    if (description) {
      question.description = description;
    }
    await question.save();
    ctx.body = question;
  }
  async checkQuestionExist(ctx, next) {
    const question = await Question.findByPk(ctx.params.id);
    if (!question || question.status != 1) {
      ctx.throw(404, "问题不存在");
    }
    ctx.state.question = question;
    await next();
  }
  async checkQuestionExist2(ctx, next) {
    const question = await Question.findByPk(ctx.params.questionId);
    if (!question || question.status != 1) {
      ctx.throw(404, "问题不存在");
    }
    ctx.state.question = question;
    await next();
  }
  async deleteQuestion(ctx) {
    const question = ctx.state.question;
    if (question.status == 1) {
      question.status = 0;
      await question.save();
    }
    ctx.status = 204;
  }
  async checkQuestioner(ctx, next) {
    const { question } = ctx.state;
    if (question.created_user != ctx.auth.id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  }
  async followQuestion(ctx) {
    const user_id = ctx.auth.id;
    const question_id = ctx.params.id;
    const followQuestion = await FollowQuestion.findOne({
      where: { user_id, question_id },
    });

    if (!followQuestion) {
      // 新增
      const followQuestionItem = new FollowQuestion();
      followQuestionItem.question_id = question_id;
      followQuestionItem.user_id = user_id;
      followQuestionItem.save();
      // 问题的关注数+1
      const question = await Question.findByPk(question_id);
      question.follow_number++;
      await question.save();
      ctx.body = followQuestionItem;
    } else if (followQuestion.status == 0) {
      // 修改为1
      followQuestion.status = 1;
      followQuestion.save();
      // 问题的关注数+1
      const question = await Question.findByPk(question_id);
      question.follow_number++;
      await question.save();
      ctx.body = followQuestion;
    } else {
      ctx.body = "";
    }
  }
  async unfollowQuestion(ctx) {
    const user_id = ctx.auth.id;
    const question_id = ctx.params.id;
    const followQuestion = await FollowQuestion.findOne({
      where: { user_id, question_id },
    });
    if (followQuestion.status == 1) {
      followQuestion.status = 0;
      await followQuestion.save();
      // 问题的关注数-1
      const question = await Question.findByPk(question_id);
      question.follow_number--;
      await question.save();
    }
    ctx.status = 204;
  }
  async listFollowingQuestions(ctx) {
    const user_id = ctx.params.id;
    const followQuestionList = await FollowQuestion.findAll({
      where: { user_id, status: 1 },
    });
    const questionIds = followQuestionList.map((item) => item.question_id);
    const questionList = await Question.findAll({
      where: {
        id: {
          [Op.in]: questionIds,
        },
      },
    });
    ctx.body = questionList;
  }
}

module.exports = new QuestionsCtl();
