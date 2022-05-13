const Answer = require("../model/answer");
const { Op } = require("sequelize");
const User = require("../model/user");
const Question = require("../model/question");
const Dynamic = require("../model/dynamic");
class AnswerssCtl {
  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
    });
    const { content } = ctx.request.body;
    const user_id = ctx.auth.id;
    const question_id = ctx.params.questionId;
    const answer = await Answer.findOne({ where: { user_id, question_id } });

    var xss = require("xss");
    const xssWhiteList = {
      /** 去掉所有不在白名单的标签 */
      stripIgnoreTagBody: true,
      whiteList: {
        a: ["style", "target", "href", "title", "rel"],
        img: ["style", "src", "title", "alt"],
        div: ["id", "style"],
        table: ["style", "width", "border"],
        tr: ["style"],
        td: ["style", "width", "colspan"],
        th: ["style", "width", "colspan"],
        h1: ["style"],
        h2: ["style"],
        h3: ["style"],
        h4: ["style"],
        h5: ["style"],
        h6: ["style"],
        hr: ["style"],
        span: ["style"],
        strong: ["style"],
        b: ["style"],
        i: ["style"],
        br: [],
        p: ["style"],
        pre: ["style"],
        code: ["style"],
        tbody: ["style"],
        ul: ["style"],
        li: ["style"],
        ol: ["style"],
        dl: ["style"],
        dt: ["style"],
        em: ["style"],
        cite: ["style"],
        section: ["style"],
        header: ["style"],
        footer: ["style"],
        blockquote: ["style"],
        audio: ["autoplay", "controls", "loop", "preload", "src"],
        video: [
          "autoplay",
          "controls",
          "loop",
          "preload",
          "src",
          "height",
          "width",
        ],
      },
      css: {
        whiteList: {
          color: true,
          "background-color": true,
          width: true,
          height: true,
          "font-size": true,
          "font-family": true,
        },
      },
    };

    const content2 = xss(content, xssWhiteList);
    // console.log(content2);
    if (answer && answer.status != 0) {
      ctx.throw(403, "该用户已经回答过该问题");
    } else {
      const answerItem = new Answer();
      answerItem.user_id = user_id;
      answerItem.question_id = question_id;
      answerItem.content = content;
      await answerItem.save();
      // 创建动态
      const dynamic = new Dynamic();
      dynamic.type = 2;
      dynamic.user_id = user_id;
      dynamic.answer_id = answerItem.id;
      await dynamic.save();
      ctx.body = answerItem;
    }
  }
  async checkAnswerer(ctx, next) {
    const user_id = ctx.auth.id;
    const answer = ctx.state.answer;
    if (ctx.auth.scope <= 8 && answer.user_id != user_id) {
      ctx.throw(403, "没有权限");
    }
    await next();
  }
  // 管理员查找所有答案
  async findAllAnswer(ctx) {
    let {
      per_page = 10,
      page = 1,
      username,
      question_name,
      status,
    } = ctx.query;
    per_page = per_page - 0;
    page = page - 0;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (username) {
      const userList = await User.findAll({
        where: {
          username: {
            [Op.like]: `%${username}%`,
          },
        },
      });
      const userIds = userList.map((item) => item.id);
      filter.user_id = {
        [Op.in]: userIds,
      };
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
    const answer = await Answer.findAll({
      where: filter,
      limit: per_page,
      offset: (page - 1) * per_page,
      order: [["created_at", "ASC"]],
    });
    const userIds = answer.map((item) => item.user_id);
    const questionIds = answer.map((item) => item.question_id);
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
    const answerCopy = answer.map((item) => {
      item["dataValues"]["username"] =
        userMap[item["dataValues"]["user_id"]]["username"];
      item["dataValues"]["question_name"] =
        questionMap[item["dataValues"]["question_id"]]["question_name"];
      return item["dataValues"];
    });
    const answer2 = await Answer.findAndCountAll();
    const data = {
      data: answerCopy,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: per_page,
        count: answer.count,
        total: answer2.count,
        total_pages: Math.ceil(answer2.count / per_page),
      },
    };
    ctx.body = data;
  }
  // 查找某个问题下的所有答案
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
  async checkAnswerExist3(ctx, next) {
    const answer = await Answer.findByPk(ctx.params.id);
    ctx.state.answer = answer;
    await next();
  }
  async findById(ctx) {
    const answer = ctx.state.answer;
    const user = await User.scope("bh").findByPk(answer.user_id);
    // 如果答案待审核
    if (answer.status == 2) {
      const writer_id = ctx.auth.id;
      const writer_scope = ctx.auth.scope;
      // 如果不是管理员
      if (writer_scope <= 8 && writer_id != user.id) {
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
  async undeleteAnswer(ctx) {
    const answer = ctx.state.answer;
    answer.status = 2;
    await answer.save();
    ctx.status = 204;
  }
  async checkAnswer(ctx) {
    const answer = ctx.state.answer;
    answer.status = 1;
    await answer.save();
    ctx.status = 204;
  }
}

module.exports = new AnswerssCtl();
