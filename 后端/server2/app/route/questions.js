const Router = require("koa-router");
const router = new Router({ prefix: "/questions" });
const {
  create,
  updateById,
  findAll,
  findById,
  checkQuestionExist,
  checkQuestioner,
  deleteQuestion,
  inviteUserAnswer,
  getUsersInvite,
} = require("../controller/questions");

const { Auth } = require("../utils/auth");
const AUTH_USER = 8;
router.get("/", findAll);
router.post("/", new Auth(AUTH_USER).m, create);
router.get("/:id", findById);
router.patch(
  "/:id",
  new Auth(AUTH_USER).m,
  checkQuestionExist,
  checkQuestioner,
  updateById
);
router.delete(
  "/:id",
  new Auth(AUTH_USER).m,
  checkQuestionExist,
  checkQuestioner,
  deleteQuestion
);
router.patch(
  "/:id/invite/:userid",
  new Auth(AUTH_USER).m,
  checkQuestionExist,
  inviteUserAnswer
);
router.get("/:id/invite/userlist", new Auth(AUTH_USER).m, getUsersInvite);
module.exports = router;
