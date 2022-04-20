const Router = require("koa-router");
const router = new Router({ prefix: "/comment" });
const { checkAnswerExist } = require("../controller/answer");
const { checkArticleExist } = require("../controller/article");
const {
  createComment,
  checkCommenter,
  deleteComment,
  checkCommentExist,
  findAll,
  findAll2,
} = require("../controller/comment");
const {
  createRelpy,
  findAllReply,
  checkReplyCommenter,
  deleteReplyComment,
  checkReplyCommentExist,
  findOneAnswerAllReply,
} = require("../controller/commentReply");
const { Auth } = require("../utils/auth");
const AUTH_USER = 8;
// 创建回答的评论
router.post(
  "/answer/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist,
  createComment
);
// 删除回答的评论
router.delete(
  "/answer/:id",
  new Auth(AUTH_USER).m,
  checkCommentExist,
  checkCommenter,
  deleteComment
);
// 查看某个回答的所有评论
router.get("/answer/:id", checkAnswerExist, findAll);

// 创建文章的评论
router.post(
  "/article/:id",
  new Auth(AUTH_USER).m,
  checkArticleExist,
  createComment
);
// 删除文章的评论
router.delete(
  "/article/:id",
  new Auth(AUTH_USER).m,
  checkCommentExist,
  checkCommenter,
  deleteComment
);
// 查看某个文章的所有评论
router.get("/article/:id", checkAnswerExist, findAll2);

// 查看某个评论的所有二级评论
router.get("/:id/replycomment", checkCommentExist, findAllReply);
// 查看某个答案的所有二级评论
router.get("/answer/:id/replycomment", checkAnswerExist, findOneAnswerAllReply);
// 创建二级评论
router.post(
  "/:id/replycomment",
  new Auth(AUTH_USER).m,
  checkCommentExist,
  createRelpy
);
// 删除二级评论
router.delete(
  "/:id/replycomment/:replyid",
  new Auth(AUTH_USER).m,
  checkReplyCommentExist,
  checkReplyCommenter,
  deleteReplyComment
);

module.exports = router;
