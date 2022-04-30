const User = require("../model/user");
const Follow = require("../model/follow");
const Question = require("../model/question");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config/config");
const Answer = require("../model/answer");
const Auth = require("../utils/auth");
const bcrypt = require("bcryptjs");
const { Op, where } = require("sequelize");
const AUTH_USER = 8;
const AUTH_ADMIN = 16;
const FollowTopic = require("../model/followTopic");
const Topic = require("../model/topic");
const LikeAnswer = require("../model/likeAnswer");
const LikeArticle = require("../model/likeArticle");
const Comment = require("../model/comment");
const Article = require("../model/article");
const Inform = require("../model/inform");
class UsersCtl {
  async checkOwner(ctx, next) {
    if (ctx.params.id != ctx.auth.id && ctx.auth.scope <= 8) {
      ctx.throw(403, "没有权限");
    }
    await next();
  }
  async findAll(ctx) {
    // select 可以让select为false 的字段显示出来
    // ctx.body = await User.find().select('password').select('name')
    // const { fileds } = ctx.query || []
    // const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
    let {
      per_page = 10,
      page = 1,
      email,
      status,
      username,
      phone,
      location,
      business,
    } = ctx.query;
    const scop = "bh";
    per_page = per_page - 0;
    page = page - 0;
    const filter = {};
    if (email) {
      filter.email = {
        [Op.like]: `%${email}%`,
      };
    }
    if (status) {
      filter.status = status;
    }
    if (username) {
      filter.username = {
        [Op.like]: `%${username}%`,
      };
    }
    if (phone) {
      filter.phone = {
        [Op.like]: `%${phone}%`,
      };
    }
    if (location) {
      filter.location = {
        [Op.like]: `%${location}%`,
      };
    }
    if (business) {
      filter.business = {
        [Op.like]: `%${business}%`,
      };
    }
    const user = await User.findAndCountAll({
      where: filter,
      limit: per_page,
      offset: (page - 1) * per_page,
      order: [["created_at", "ASC"]],
      attributes: {
        exclude: ["password"],
      },
    });
    const user2 = await User.findAndCountAll();
    const data = {
      data: user.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: user.count,
        total: user2.count,
        total_pages: Math.ceil(user.count / 10),
      },
    };
    ctx.body = data;
  }
  async findById(ctx) {
    const id = ctx.params.id;
    const { email, status, username } = ctx.query;
    // if (!fileds) { fileds = []}
    const scop = "bh";
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (id) {
      filter.id = id;
    }
    if (status) {
      filter.status = status;
    }
    if (username) {
      filter.username = {
        [Op.like]: `%${username}%`,
      };
    }
    const user = await User.scope(scop).findOne({
      where: filter,
    });
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    const data = {
      user,
    };
    ctx.body = data;
  }
  async updateById(ctx) {
    // ctx.verifyParams({
    //   username: { type: "string", required: false },
    //   password: { type: "string", required: false },
    //   avatar_url: { type: "string", required: false },
    //   gender: { type: "string", required: false },
    //   location: { type: "string", required: false },
    // });
    const user = await User.findByPk(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    const {
      username,
      gender,
      headline,
      location,
      business,
      avatar_url,
      background_url,
      password,
      phone,
    } = ctx.request.body;
    if (phone) {
      user.phone = phone;
    }
    if (username) {
      user.username = username;
    }
    if (gender == 0 || gender == 1) {
      user.gender = gender - 0;
    }
    if (headline) {
      user.headline = headline;
    }
    if (location) {
      user.location = location;
    }
    if (business) {
      user.business = business;
    }
    if (avatar_url) {
      user.avatar_url = avatar_url;
    }
    if (background_url) {
      user.background_url = background_url;
    }
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      // 生成加密密码
      const psw = bcrypt.hashSync(password, salt);
      user.password = psw;
    }
    await user.save();
    ctx.body = user;
  }
  async deleteById(ctx) {
    const user = await User.findOne({ where: { id: ctx.params.id } });
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    user.status = 0;
    user.save();
    ctx.status = 204;
  }
  async undeleteById(ctx) {
    const user_id = ctx.params.id;
    const user = await User.findByPk(user_id);
    user.status = 1;
    await user.save();
    ctx.status = 204;
  }
  async create(ctx) {
    ctx.verifyParams({
      username: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { username, password, email, phone, location, gender, business } = ctx.request.body;
    // const repeateUser = await User.findOne({
    //   where: {
    //     email,
    //   },
    // });
    // if (repeateUser) {
    //   ctx.throw(409, "该邮箱已经注册");
    // }
    // const Client = require("./controller/ailiyun");

    // try {
    //   Client.main(1);
    // } catch (error) {
    //   console.log(err);
    // }
    const user = new User();
    user.username = username;
    user.phone = phone;
    user.password = password;
    if(location){
      user.location = location
    }
    if(business) {
      user.business = business
    }
    if(gender) {
      user.gender = gender
    }
    const res = await user.save();
    const data = {
      code: 200,
      email: res.email,
      username: res.username,
    };
    ctx.body = data;
  }
  async login(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const user = await User.findOne({ where: { email, status: 1 } });
    if (!user) {
      ctx.throw(401, "用户名或者密码不正确");
    }
    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      ctx.throw(401, "用户名或者密码错误");
    }
    const token = jsonwebtoken.sign(
      { email, scope: AUTH_USER, id: user.id },
      secret,
      { expiresIn: "1d" }
    );
    ctx.body = { token: token, id: user.id };
  }
  async checkUserExist(ctx, next) {
    const user = await User.findByPk(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.state.user = user;
    await next();
  }
  // 添加关注
  async follow(ctx) {
    const user_id = ctx.auth.id;
    const followed_id = ctx.params.id;
    if (user_id == followed_id) {
      ctx.throw(403, "不能关注自己");
    }
    const follow = await Follow.findOne({ where: { user_id, followed_id } });

    if (!follow) {
      const followItem = new Follow();
      followItem.user_id = user_id;
      followItem.followed_id = followed_id;
      await followItem.save();
      const inform = new Inform();
      inform.type = 5;
      inform.user_id = user_id;
      inform.inform_user_id = followed_id;
      await inform.save();
    } else if (follow.status === 0) {
      follow.status = 1;
      await follow.save();
    }
    ctx.status = 204;
  }
  // 查询关注
  async listFollowing(ctx) {
    const followedList = await Follow.findAll({
      where: { user_id: ctx.params.id, status: 1 },
    });
    if (followedList) {
      const followedIds = followedList.map((item) => item.followed_id);
      const followed_users = await User.scope("bh").findAll({
        where: { id: { [Op.in]: followedIds } },
      });
      const followed_usersCopy = followed_users.map(
        (item) => item["dataValues"]
      );
      ctx.body = followed_usersCopy;
    } else {
      ctx.body = [];
    }
  }
  // 取消关注
  async unfollow(ctx) {
    const user_id = ctx.auth.id;
    const followed_id = ctx.params.id;
    const followItem = await Follow.findOne({
      where: { user_id, followed_id },
    });
    if (followItem) {
      followItem.status = 0;
      followItem.save();
    }
    ctx.status = 204;
  }
  // 查询粉丝
  async listFollower(ctx) {
    // 查询用户，限制条件：关注列表内有 ctx.params.id 的用户
    const followed_id = ctx.params.id;
    const users = await Follow.findAll({ where: { followed_id } });
    if (users) {
      const userIds = users.map((item) => item.user_id);
      const userList = await User.scope("bh").findAll({
        where: { id: { [Op.in]: userIds } },
      });
      ctx.body = userList;
    } else {
      ctx.body = users;
    }
  }

  // 添加话题关注
  async followTopic(ctx) {
    // const me = await User.findByPk(ctx.auth.id)
    const followTopic = await FollowTopic.findOne({
      where: { user_id: ctx.auth.id, topic_id: ctx.params.id },
    });
    if (!followTopic) {
      const followTopicItem = new FollowTopic();
      followTopicItem.user_id = ctx.auth.id;
      followTopicItem.topic_id = ctx.params.id;
      await followTopicItem.save();
    } else if (followTopic.status == 0) {
      followTopic.status = 1;
      await followTopic.save();
    }
    ctx.status = 204;
  }
  // 查询关注话题
  async listFollowingTopics(ctx) {
    const followTopicList = await FollowTopic.findAll({
      where: { user_id: ctx.params.id, status: 1 },
    });
    const topicIds = followTopicList.map((item) => item.topic_id);
    const TopicList = await Topic.findAll({
      where: { id: { [Op.in]: topicIds } },
      attributes: {
        exclude: [
          "updated_at",
          "status",
          "created_at",
          "created_admin",
          "deleted_at",
        ],
      },
    });
    if (!followTopicList) {
      ctx.body = [];
    }
    ctx.body = TopicList;
  }
  // 取消话题关注
  async unfollowTopic(ctx) {
    const followTopicItem = await FollowTopic.findOne({
      where: { user_id: ctx.auth.id, topic_id: ctx.params.id },
    });
    if (followTopicItem) {
      followTopicItem.status = 0;
      await followTopicItem.save();
    }

    ctx.status = 204;
  }
  async listQuestions(ctx) {
    const questions = await Question.findAll({
      where: { created_user: ctx.params.id, status: 1 },
      attributes: {
        exclude: [
          "created_user",
          "updated_at",
          "deleted_at",
          "description",
          "pageviews",
          "status",
        ],
      },
      order: [["created_at", "DESC"]],
    });
    ctx.body = questions;
  }
  async listUserAllAnswer(ctx) {
    const login_user_id = ctx.auth.id;
    const user_id = ctx.params.id;
    const statusArr = [1];
    if (login_user_id == user_id) {
      statusArr.push(2);
    }
    const answerList = await Answer.findAll({
      where: {
        user_id: user_id,
        status: statusArr,
      },
      order: [["created_at", "DESC"]],
    });
    const answerListCopy = answerList.map((item) => item["dataValues"]);
    const questionIds = answerList.map((item) => item.question_id);
    const questionList = await Question.findAll({
      where: {
        id: {
          [Op.in]: questionIds,
        },
      },
    });
    const questionMap = {};
    questionList.forEach((item) => {
      questionMap[item.id] = item;
    });
    answerListCopy.forEach((item) => {
      item["question"] = questionMap[item.question_id];
    });
    ctx.body = answerListCopy;
  }
  // 点赞回答
  async likeAnswer(ctx) {
    const user_id = ctx.auth.id;
    const answer_id = ctx.params.id - 0;
    const likeAnswerItem = await LikeAnswer.findOne({
      where: { user_id, answer_id },
    });
    const answer = await Answer.findByPk(answer_id);
    if (!likeAnswerItem) {
      const likeanswer = new LikeAnswer();
      likeanswer.user_id = user_id;
      likeanswer.answer_id = answer_id;
      await likeanswer.save();
      answer.favorite_num++;
      await answer.save();
      // 如果回答者不是点赞者，创建通知
      if (answer.user_id != user_id) {
        const inform = new Inform();
        inform.type = 0;
        inform.user_id = user_id;
        inform.inform_user_id = answer.user_id;
        inform.answer_id = answer.id;
        await inform.save();
      }
    } else if (likeAnswerItem.status == 0) {
      likeAnswerItem.status = 1;
      await likeAnswerItem.save();
      answer.favorite_num++;
      await answer.save();
      if (answer.user_id != user_id) {
        const inform = await Inform.findOne({
          where: {
            type: 0,
            user_id: user_id,
            inform_user_id: answer.user_id,
            answer_id: answer.id,
          },
        });
        inform.status = 0;
        await inform.save();
      }
    }

    ctx.status = 204;
  }
  // 取消点赞回答
  async unLikingAnswer(ctx) {
    const user_id = ctx.auth.id;
    const answer_id = ctx.params.id - 0;
    const likeAnswerItem = await LikeAnswer.findOne({
      where: { user_id, answer_id },
    });
    const answer = await Answer.findByPk(answer_id);
    if (likeAnswerItem && likeAnswerItem.status != 0) {
      likeAnswerItem.status = 0;
      await likeAnswerItem.save();
      answer.favorite_num--;
      await answer.save();
      if (answer.user_id != user_id) {
        const inform = await Inform.findOne({
          where: {
            user_id: user_id,
            answer_id: answer_id,
            inform_user_id: answer.user_id,
            type: 0,
          },
        });
        inform.status = 2;
        await inform.save();
      }
    }
    ctx.status = 204;
  }
  // 列出某个用户的回答的点赞列表
  async listLikingAnswer(ctx) {
    const user_id = ctx.params.id;
    const likeAnswerList = await LikeAnswer.findAll({
      where: {
        user_id,
        status: 1,
      },
    });
    const answerIds = likeAnswerList.map((item) => item.answer_id);
    const answerList = await Answer.findAll({
      where: {
        id: {
          [Op.in]: answerIds,
        },
      },
      attributes: {
        exclude: [
          "created_at",
          "question_id",
          "pageviews",
          "favorite_num",
          "admin_id",
          "status",
          "updated_at",
          "deleted_at",
        ],
      },
    });
    if (!answerList) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = answerList;
  }
  // 列出某个用户获取的点赞数
  async getUserLikingNum(ctx) {
    const user_id = ctx.params.id;
    const answerList = await Answer.findAll({ where: { user_id } });
    const answerIds = answerList.map((item) => item.id);
    const likeUserAnswerList = await LikeAnswer.findAll({
      where: {
        answer_id: {
          [Op.in]: answerIds,
        },
        status: 1,
      },
    });
    ctx.body = { num: likeUserAnswerList.length };
  }

  // 点赞文章
  async likeArticle(ctx) {
    const user_id = ctx.auth.id;
    const article_id = ctx.params.id - 0;
    const likeArticleItem = await LikeArticle.findOne({
      where: { user_id, article_id },
    });
    const article = await Article.findByPk(article_id);
    if (!likeArticleItem) {
      const likeartile = new LikeArticle();
      likeartile.user_id = user_id;
      likeartile.article_id = article_id;
      await likeartile.save();
      article.favorite_num++;
      await article.save();
      // 如果点赞者不是文章创建者就创建通知
      if (article.user_id != user_id) {
        // 创建通知
        const inform = new Inform();
        inform.type = 1;
        inform.user_id = user_id;
        inform.inform_user_id = article.user_id;
        inform.article_id = article.id;
        await inform.save();
      }
    } else if (likeArticleItem.status == 0) {
      likeArticleItem.status = 1;
      await likeArticleItem.save();
      article.favorite_num++;
      await article.save();
      // 如果点赞者不是文章创建者就创建通知
      if (article.user_id != user_id) {
        const inform = await Inform.findOne({
          where: {
            type: 1,
            user_id: user_id,
            inform_user_id: article.user_id,
            article_id: article.id,
          },
        });
        inform.status = 0;
        await inform.save();
      }
    }

    ctx.status = 204;
  }
  // 取消点赞文章
  async unLikingArticle(ctx) {
    const user_id = ctx.auth.id;
    const article_id = ctx.params.id - 0;
    const likeArticleItem = await LikeArticle.findOne({
      where: { user_id, article_id },
    });
    const article = await Article.findByPk(article_id);
    if (likeArticleItem && likeArticleItem.status != 0) {
      likeArticleItem.status = 0;
      await likeArticleItem.save();
      article.favorite_num--;
      await article.save();
      // 如果取消点赞者不是文章创建者就取消通知
      if (article.user_id != user_id) {
        const inform = await Inform.findOne({
          where: {
            user_id: user_id,
            article_id: article_id,
            inform_user_id: article.user_id,
            type: 1,
          },
        });
        inform.status = 2;
        await inform.save();
      }
    }
    ctx.status = 204;
  }
  // 列出某个用户的文章的点赞列表
  async listLikingArticle(ctx) {
    const user_id = ctx.params.id;
    const likeArticleList = await LikeArticle.findAll({
      where: {
        user_id,
        status: 1,
      },
    });
    const articleIds = likeArticleList.map((item) => item.article_id);
    const articleList = await Article.findAll({
      where: {
        id: {
          [Op.in]: articleIds,
        },
      },
      attributes: {
        exclude: [
          "created_at",
          "pageviews",
          "favorite_num",
          "admin_id",
          "status",
          "updated_at",
          "deleted_at",
        ],
      },
    });
    if (!articleList) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = articleList;
  }
  // 获取用户的通知
  async getUserinForm(ctx) {
    const user_id = ctx.auth.id;
    const informList = await Inform.findAll({
      where: {
        inform_user_id: user_id,
        status: {
          // 未读 | 已读
          [Op.in]: [0, 1],
        },
      },
    });
    const userIds = new Set();
    const answerIds = new Set();
    const articleIds = new Set();
    const questionIds = new Set();

    const userMap = {};
    const answerMap = {};
    const articleMap = {};
    const questionMap = {};
    informList.forEach((item) => {
      if (item.user_id) {
        userIds.add(item.user_id);
      }
      if (item.answer_id) {
        answerIds.add(item.answer_id);
      }
      if (item.article_id) {
        articleIds.add(item.article_id);
      }
      if (item.question_id) {
        questionIds.add(item.question_id);
      }
    });
    const userList = await User.scope("bh").findAll({
      where: {
        id: {
          [Op.in]: Array.from(userIds),
        },
      },
    });
    const answerList = await Answer.findAll({
      where: {
        id: {
          [Op.in]: Array.from(answerIds),
        },
      },
      attributes: {
        exclude: [
          "content",
          "updated_at",
          "status",
          "created_at",
          "created_admin",
          "deleted_at",
        ],
      },
    });
    answerList.forEach((item) => {
      questionIds.add(item.question_id);
    });
    const articleList = await Article.findAll({
      where: {
        id: {
          [Op.in]: Array.from(articleIds),
        },
      },
      attributes: {
        exclude: [
          "content",
          "updated_at",
          "status",
          "created_at",
          "created_admin",
          "deleted_at",
        ],
      },
    });
    const questionList = await Question.findAll({
      where: {
        id: {
          [Op.in]: Array.from(questionIds),
        },
      },
      attributes: {
        exclude: [
          "description",
          "updated_at",
          "status",
          "created_at",
          "created_admin",
          "deleted_at",
        ],
      },
    });
    userList.forEach((item) => {
      userMap[item.id] = item["dataValues"];
    });
    answerList.forEach((item) => {
      answerMap[item.id] = item["dataValues"];
    });
    articleList.forEach((item) => {
      articleMap[item.id] = item["dataValues"];
    });
    questionList.forEach((item) => {
      questionMap[item.id] = item["dataValues"];
    });
    const res = [];
    informList.forEach((item) => {
      const data = item["dataValues"];
      if (item.type == 0) {
        data["user"] = userMap[data.user_id];
        data["answer"] = answerMap[data.answer_id];
        data["question"] = questionMap[answerMap[data.answer_id].question_id];
        res.unshift(data);
      } else if (item.type == 1) {
        data["user"] = userMap[data.user_id];
        data["article"] = articleMap[data.article_id];
        res.unshift(data);
      } else if (item.type == 3) {
        data["user"] = userMap[data.user_id];
        data["answer"] = answerMap[data.answer_id];
        data["question"] = questionMap[answerMap[data.answer_id].question_id];
        res.unshift(data);
      } else if (item.type == 4) {
        data["user"] = userMap[data.user_id];
        data["article"] = articleMap[data.article_id];
        res.unshift(data);
      } else if (item.type == 5) {
        data["user"] = userMap[data.user_id];
        res.unshift(data);
      } else if (item.type == 6) {
        data["user"] = userMap[data.user_id];
        data["question"] = questionMap[data.question_id];
        res.unshift(data);
      }
    });
    ctx.body = res;
  }
}

module.exports = new UsersCtl();
