const Answer = require("../model/answer");
const { Op } = require("sequelize");
const User = require("../model/user");
class AnswerssCtl {
  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
    });
    const { content } = ctx.request.body;
    const user_id = ctx.auth.id;
    const question_id = ctx.params.questionId;
    const answer = await Answer.findOne({ where: { user_id, question_id } });
    if (answer && answer.status != 0) {
      ctx.throw(403, "该用户已经回答过该问题");
    } else {
      const answerItem = new Answer();
      answerItem.user_id = user_id;
      answerItem.question_id = question_id;
      answerItem.content = content;
      await answerItem.save();
      ctx.body = answerItem;
    }
  }
  async checkAnswerer(ctx, next) {
    const user_id = ctx.auth.id;
    const answer = ctx.state.answer;
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
    const userIds = AnswerList.map((item) => {
      return item.user_id;
    });
    const answerListCopy = AnswerList.map((item) => item["dataValues"]);
    const userList = await User.scope("bh").findAll({
      where: { id: { [Op.in]: userIds } },
    });
    const usermap = {};
    userList.forEach((item) => {
      usermap[item.id] = item["dataValues"];
    });
    answerListCopy.forEach((item) => {
      item["userInfo"] = usermap[item.user_id];
    });
    ctx.body = answerListCopy;
  }
  async checkAnswerExist(ctx, next) {
    const answer = await Answer.findByPk(ctx.params.id);
    if (!answer || answer.status == 0) {
      ctx.throw(404, "回答不存在");
    }
    // 只有在删改查答案时才检查该逻辑，赞和踩的时候不检查
    // if ( ctx.params.questionId && ctx.params.questionId !== answer.questionId ) {
    //      ctx.throw(404, '该问题下没有此答案')
    // }
    ctx.state.answer = answer;
    await next();
  }
  async checkAnswerExist2(ctx, next) {
    const answer = await Answer.findByPk(ctx.params.id);
    if (!answer || answer.status == 0) {
      ctx.throw(404, "回答不存在");
    }
    // 只有在删改查答案时才检查该逻辑，赞和踩的时候不检查
    // if ( ctx.params.questionId && ctx.params.questionId !== answer.questionId ) {
    //      ctx.throw(404, '该问题下没有此答案')
    // }
    ctx.state.answer = answer;
    await next();
  }
  async findById(ctx) {
    const answer = ctx.state.answer;
    const user = await User.scope("bh").findByPk(answer.user_id);
    // 如果答案待审核
    if (answer.status == 2) {
      const writer = await User.scope("bh").findByPk(ctx.auth.id);
      if (writer.id != user.id) {
        // 如果登录用户不是该答案作者
        ctx.throw(403, "禁止获取未审核的答案");
        return;
      } else {
        const answercopy = answer["dataValues"];
        answercopy["userInfo"] = user["dataValues"];
        ctx.body = answercopy;
      }
    } else {
      const answercopy = answer["dataValues"];
      answercopy["userInfo"] = user["dataValues"];
      ctx.body = answercopy;
    }
  }
  async findByUserId(ctx) {
    // 返回用户的未删除的某个回答
    const user = ctx.state.user;
    const questionId = ctx.params.questionId;
    const login_user_id = ctx.auth.id;
    const writer_user_id = user.id;
    const statusArr = [1];
    if (writer_user_id == login_user_id) {
      statusArr.push(2);
    }
    const answer = await Answer.findOne({
      where: {
        user_id: user.id,
        question_id: questionId,
        status: {
          [Op.in]: statusArr,
        },
      },
    });
    if (answer) {
      const answerCopy = answer["dataValues"];
      answerCopy["userInfo"] = user;
      ctx.body = answerCopy;
    } else {
      ctx.body = "";
    }
  }
  async updateById(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: false },
    });
    const { content } = ctx.request.body;
    const answer = ctx.state.answer;
    answer.content = content;
    answer.status = 2;
    await answer.save();
    ctx.body = answer;
  }
  async deleteAnswer(ctx) {
    const answer = ctx.state.answer;
    answer.status = 0;
    await answer.save();
    ctx.status = 204;
  }
}

module.exports = new AnswerssCtl();
