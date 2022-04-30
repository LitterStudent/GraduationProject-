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
} = require("../controller/topics");
const { checkTopicExist } = require("../controller/topics");

const { Auth } = require("../utils/auth");
const AUTH_ADMIN = 16;

router.get("/", findAll);
router.get("/adminfind", adminfindAll);
router.post("/", new Auth(AUTH_ADMIN).m, create);
router.get("/:id", findById);
router.patch("/:id", new Auth(AUTH_ADMIN).m, checkTopicExist, updateById);
router.get("/:id/followers", checkTopicExist, listFollowers);
router.get("/:id/questions", checkTopicExist, listQuestions);
module.exports = router;
