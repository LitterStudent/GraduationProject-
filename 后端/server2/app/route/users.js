const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const {
  listFollowing,
  follow,
  findAll,
  findById,
  updateById,
  deleteById,
  create,
  login,
  checkOwner,
  unfollow,
  listFollower,
  checkUserExist,
  followTopic,
  unfollowTopic,
  listFollowingTopics,
  listQuestions,
  listLikingAnswer,
  likeAnswer,
  unLikingAnswer,
  getUserLikingNum,
  listLikingArticle,
  likeArticle,
  unLikingArticle,
  commentAnswer,
  commentAnswerReply,
  listUserAllAnswer,
  getUserinForm,
  readUserinForm,
  undeleteById,
  getUserRecommend,
  getUserDynamic,
  getUserFollowDynamic
} = require("../controller/users");
const { checkTopicExist } = require("../controller/topics");
const { checkAnswerExist } = require("../controller/answer");
const { checkArticleExist } = require("../controller/article");
const {
  followQuestion,
  unfollowQuestion,
  checkQuestioner,
  checkQuestionExist,
  listFollowingQuestions,
} = require("../controller/questions");
const {
  checkColumnExist,
  followColumn,
  unfollowColumn,
  getUserFollowingColumn,
  findByUserId,
} = require("../controller/column");
const { getUserAllArticle } = require("../controller/article");

// const jsonwebtoken = require('jsonwebtoken')

//  1.手写认证
// const auth = async (ctx, next) => {
//     const { authorization = '' } = ctx.request.header;
//     const token = authorization.replace('Bearer ', '')
//     try{
//         const user = jsonwebtoken.verify(token, secret)
//         ctx.state.user = user
//     } catch (err) {
//         ctx.throw(401, err.message)
//     }
//     await next()
// }
//  2.jwt认证
const { Auth } = require("../utils/auth");
const AUTH_USER = 8;
const AUTH_ADMIN = 16;
router.get("/", findAll);
// router.post('/:id', (ctx) => {
//     ctx.body = `这是用户${ctx.params.id}${{name: 'xioming'}}`
// })
router.post("/", create);
router.get("/:id", findById);
// 更新本人用户信息 认证和鉴权
// Auth可以鉴别token是否有效与权限范围
router.patch("/:id", new Auth(AUTH_USER).m, checkOwner, updateById);
// 禁用用户
// router.delete('/:id',auth, checkOwner, deleteById)
router.delete("/:id", new Auth(AUTH_ADMIN).m, deleteById);
// 解禁用户
router.patch("/undelete/:id", new Auth(AUTH_ADMIN).m, undeleteById);
router.post("/login", login);

// 获取用户的关注列表
router.get("/:id/following", listFollowing);
// 粉丝列表
router.get("/:id/followers", listFollower);
// 关注某个用户
router.put("/following/:id", new Auth(AUTH_USER).m, checkUserExist, follow);
// 取消关注
router.delete(
  "/unfollowing/:id",
  new Auth(AUTH_USER).m,
  checkUserExist,
  unfollow
);

// 查询某个用户关注的话题
router.get("/:id/followingTopic", listFollowingTopics);
// 关注话题
router.put(
  "/followingTopics/:id",
  new Auth(AUTH_USER).m,
  checkTopicExist,
  followTopic
);
// 取消关注话题
router.delete(
  "/followingTopic/:id",
  new Auth(AUTH_USER).m,
  checkTopicExist,
  unfollowTopic
);

// 用户的问题列表
router.get("/:id/questions", listQuestions);
// 关注问题
router.put(
  "/followingquestion/:id",
  new Auth(AUTH_USER).m,
  checkQuestionExist,
  followQuestion
);
// 取消关注问题
router.delete(
  "/followingquestion/:id",
  new Auth(AUTH_USER).m,
  checkQuestionExist,
  unfollowQuestion
);
// 查询某个用户关注的话题
router.get("/:id/followingquestion", listFollowingQuestions);
// 查询某个用户的所有回答
router.get("/:id/allAnswer", new Auth(AUTH_USER).m, listUserAllAnswer);
// 查询某个用户回答点赞列表
router.get("/:id/likinganswer", listLikingAnswer);
// 查询某个用户获得的点赞数
router.get("/:id/belikednum", getUserLikingNum);
// 点赞某个回答
router.put(
  "/likinganswer/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist,
  likeAnswer
);
// 取消点赞某个回答
router.delete(
  "/likinganswer/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist,
  unLikingAnswer
);

// 查询某个用户文章点赞列表
router.get("/:id/likingarticle", listLikingArticle);
// 点赞某个文章
router.put(
  "/likingarticle/:id",
  new Auth(AUTH_USER).m,
  checkArticleExist,
  likeArticle
);
// 取消点赞某个文章
router.delete(
  "/likingarticle/:id",
  new Auth(AUTH_USER).m,
  checkArticleExist,
  unLikingArticle
);

// 用户所有的文章
router.get("/:id/allarticle", new Auth(AUTH_USER).m, getUserAllArticle);

// 用户的动态
router.get("/:id/dynamic", new Auth(AUTH_USER).m, getUserDynamic);

// 关注专栏
router.put(
  "/followingcolum/:column_id",
  new Auth(AUTH_USER).m,
  checkColumnExist,
  followColumn
);
// 取消关注专栏
router.delete(
  "/unfollowingcolum/:column_id",
  new Auth(AUTH_USER).m,
  checkColumnExist,
  unfollowColumn
);
// 用户关注的所有专栏
router.get("/:id/followingcolumn", getUserFollowingColumn);
// 用户创建的所有专栏
router.get("/:id/findallcolumn", findByUserId);

// 查询用户的最近通知
router.get("/:id/inform", new Auth(AUTH_USER).m, getUserinForm);
router.patch("/:id/readinform", new Auth(AUTH_USER).m, readUserinForm);

//获取首页推荐
router.get("/:id/recommend", new Auth(AUTH_USER).m, getUserRecommend);
// 获取首页用户动态
router.get("/:id/followerrecommend", new Auth(AUTH_USER).m, getUserFollowDynamic);
module.exports = router;
