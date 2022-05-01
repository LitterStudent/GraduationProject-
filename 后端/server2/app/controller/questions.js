const Question = require("../model/question");
const { Op, where } = require("sequelize");
const Topic = require("../model/topic");
const Follow = require("../model/follow");
const FollowQuestion = require("../model/followQuestion");
const Invite = require("../model/invite");
const User = require("../model/user");
const Admin = require("../model/admin");
const Inform = require("../model/inform");
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
  async adminfindAll(ctx) {
    let {
      per_page = 10,
      page = 1,
      question_name,
      description,
      status,
      username,
      topic_name: topic_name1,
    } = ctx.query;
    page = Math.max(page * 1, 1) - 1;
    per_page = Math.max(per_page * 1, 1);
    const filter = {};
    if (question_name) {
      filter.question_name = {
        [Op.like]: `%${question_name}%`,
      };
    }
    if (description) {
      filter.description = {
        [Op.like]: `%${description}%`,
      };
    }
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
      filter.created_user = {
        [Op.in]: userIds,
      };
    }
    if (topic_name1) {
      const topicList = await Topic.findAll({
        where: {
          topic_name: {
            [Op.like]: `%${topic_name1}%`,
          },
        },
      });
      const topicIds = topicList.map((item) => item.id);
      filter.topic_id = {
        [Op.in]: topicIds,
      };
    }
    const questionList = await Question.findAll({
      where: filter,
      limit: per_page,
      offset: page * per_page,
      order: [["created_at", "DESC"]],
    });
    const userIds = questionList.map((item) => item.created_user);
    const adminIds = questionList.map((item) => item.created_admin);
    const topicIds = questionList.map((item) => item.topic_id);
    const userList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
    const adminList = await Admin.findAll({
      where: {
        id: {
          [Op.in]: adminIds,
        },
      },
    });
    const topicList = await Topic.findAll({
      where: {
        id: {
          [Op.in]: topicIds,
        },
      },
    });
    const userMap = {};
    const topicMap = {};
    const adminMap = {};
    topicList.forEach((item) => (topicMap[item.id] = item));
    userList.forEach((item) => (userMap[item.id] = item));
    adminList.forEach((item) => {
      adminMap[item.id] = item;
    });
    const questionListCopy = questionList.map((item) => {
      item["dataValues"]["topic_name"] = topicMap[item.topic_id]["topic_name"];
      if (item.created_user) {
        item["dataValues"]["username"] = userMap[item.created_user]["username"];
      } else if (item.created_admin) {
        item["dataValues"]["username"] =
          adminMap[item.created_admin]["nickname"];
      }
      // const li = document.createElement("li");
      // li.innerHTML = item["dataValues"]["description"];
      // console.log(li.innerText);
      return item["dataValues"];
    });
    const question2 = await Question.findAndCountAll();
    const data = {
      data: questionListCopy,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: per_page,
        count: questionListCopy.count,
        total: question2.count,
        total_pages: Math.ceil(question2.count / 10),
      },
    };
    ctx.body = data;
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
    });

    const question = new Question();
    let { question_name, description, topic_id } = ctx.request.body;
    if (ctx.auth.scope > 8) {
      // 如果是管理员
      topic_id = ctx.request.body.topic_name;
      const created_admin = ctx.auth.id;
      question.created_admin = created_admin;
    } else {
      const created_user = ctx.auth.id;
      question.created_user = created_user;
    }
    question.question_name = question_name;
    question.topic_id = topic_id - 0;
    if (description) {
      question.description = description;
    }
    await question.save();
    const topic = await Topic.findByPk(topic_id);
    topic.question_num++;
    await topic.save();
    ctx.body = question;
  }
  async updateById(ctx) {
    ctx.verifyParams({
      question_name: { type: "string", required: false },
      description: { type: "string", required: false },
    });
    const { question_name, description, topic_name } = ctx.request.body;
    const question = ctx.state.question;
    if (question_name) {
      question.question_name = question_name;
    }
    if (description) {
      question.description = description;
    }
    if (topic_name) {
      question.topic_id = topic_name;
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
      const topic = await Topic.findByPk(question.topic_id);
      topic.question_num--;
      await topic.save();
    }
    ctx.status = 204;
  }
  async undeleteQuestion(ctx) {
    const question = await Question.findByPk(ctx.params.id);
    if (question.status == 0) {
      question.status = 1;
      await question.save();
      const topic = await Topic.findByPk(question.topic_id);
      topic.question_num++;
      await topic.save();
    }
    ctx.status = 204;
  }
  async checkQuestioner(ctx, next) {
    const { question } = ctx.state;
    if (ctx.auth.scope <= 8 && question.created_user != ctx.auth.id) {
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
  // 邀请用户回答问题
  async inviteUserAnswer(ctx) {
    const user_id = ctx.auth.id;
    const invited_user_id = ctx.params.userid - 0;
    const question = ctx.state.question;
    const inviteOne = await Invite.findOne({
      where: {
        user_id: user_id,
        invited_user_id: invited_user_id,
        question_id: question.id,
      },
    });
    if (!inviteOne) {
      // 创建邀请项
      const invite = new Invite();
      invite.user_id = user_id;
      invite.invited_user_id = invited_user_id;
      invite.question_id = question.id;
      await invite.save();
      // 创建通知项
      const inform = new Inform();
      inform.type = 6;
      inform.user_id = user_id;
      inform.inform_user_id = invited_user_id;
      inform.question_id = question.id;
      await inform.save();
      ctx.status = 200;
    } else {
      ctx.throw(403, "已经邀请过了");
    }
  }
  // 获取邀请用户列表回答某个问题，有些用户可能已经邀请
  async getUsersInvite(ctx) {
    const question_id = ctx.params.id;
    const user_id = ctx.auth.id;
    const follow_user_list = await Follow.findAll({
      where: {
        user_id: user_id,
      },
    });
    const followed_user_list = await Follow.findAll({
      where: {
        followed_id: user_id,
      },
    });
    const userIdsList = new Set();
    follow_user_list.forEach((item) => {
      userIdsList.add(item.followed_id);
    });
    followed_user_list.forEach((item) => {
      userIdsList.add(item.user_id);
    });
    const inviteList = await Invite.findAll({
      where: {
        user_id: user_id,
        invited_user_id: {
          [Op.in]: Array.from(userIdsList),
        },
        question_id,
      },
    });
    const inviteMap = {};
    inviteList.forEach((item) => {
      inviteMap[item.invited_user_id] = 1;
    });
    const userList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: Array.from(userIdsList),
        },
      },
    });
    const userListCopy = userList.map((item) => item["dataValues"]);
    userListCopy.forEach((item) => {
      if (inviteMap[item.id] == 1) {
        // 该用户已经被邀请
        item.isInvite = true;
      } else {
        item.isInvite = false;
      }
    });
    ctx.body = userListCopy;
  }
  // 获取我的被邀请信息
  async getOthersInviteMe(ctx) {}
  // 已读邀请
  async readInvite(ctx) {}
}

module.exports = new QuestionsCtl();
