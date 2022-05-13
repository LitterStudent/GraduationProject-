const Router = require("koa-router");
const router = new Router({ prefix: "/topics" });
const {
  create,
  updateById,
  findAll,
  findById,
  listFollowers,
  listQuestions,
  adminfindAll,
  deletetopic,
  undeletetopic,
  getTopicContent,
} = require("../controller/topics");
const { checkTopicExist } = require("../controller/topics");

const { Auth } = require("../utils/auth");
const AUTH_ADMIN = 16;

router.get("/", findAll);
router.get("/adminfind", adminfindAll);
router.post("/", new Auth(AUTH_ADMIN).m, create);
router.delete("/delete/:id", new Auth(AUTH_ADMIN).m, deletetopic);
router.patch("/undelete/:id", new Auth(AUTH_ADMIN).m, undeletetopic);
router.get("/:id", findById);
router.patch("/:id", new Auth(AUTH_ADMIN).m, checkTopicExist, updateById);
router.get("/:id/followers", checkTopicExist, listFollowers);
router.get("/:id/questions", checkTopicExist, listQuestions);
router.get("/:id/content", getTopicContent);
module.exports = router;
