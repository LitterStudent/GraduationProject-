const Router = require("koa-router");
const router = new Router({ prefix: "/questions/:questionId/answers" });
const {
  create,
  updateById,
  findAll,
  findById,
  checkAnswerExist,
  checkAnswerExist2,
  checkAnswerExist3,
  checkAnswerer,
  deleteAnswer,
  findByUserId,
  undeleteAnswer,
  checkAnswer
} = require("../controller/answer");
const { checkUserExist } = require("../controller/users");
const { checkQuestionExist2 } = require("../controller/questions");
const { Auth } = require("../utils/auth");
const AUTH_USER = 8;
// 查询所有回答
// 先判断查找的问题是否存在
router.get("/", checkQuestionExist2, findAll);
// 创建回答
router.post("/", new Auth(AUTH_USER).m, checkQuestionExist2, create);
// 查询某个回答
// // 判断回答是否1正常
router.get("/:id", new Auth(AUTH_USER).m, checkAnswerExist, findById);
router.get("/user/:id", new Auth(AUTH_USER).m, checkUserExist, findByUserId);
// // 点赞和取消点赞
// // 判断回答是否1正常或者2待审核（不为0禁用）
router.patch(
  "/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist2,
  checkAnswerer,
  updateById
);
router.delete(
  "/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist2,
  checkAnswerer,
  deleteAnswer
);
router.patch(
  "/undelete/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist3,
  checkAnswerer,
  undeleteAnswer
);
router.patch(
  "/check/:id",
  new Auth(AUTH_USER).m,
  checkAnswerExist3,
  checkAnswerer,
  checkAnswer
);
module.exports = router;
