const Router = require("koa-router");
const router = new Router({ prefix: "/rank" });
const {
  create,
  updateById,
  findAll,
  findById,
  adminfindAll,
  deleterank,
  undeleterank,
} = require("../controller/rank");
const { checkQuestionExist } = require("../controller/questions");

const { Auth } = require("../utils/auth");
const AUTH_ADMIN = 16;

router.get("/", findAll);
router.get("/adminfind", adminfindAll);
router.post("/", new Auth(AUTH_ADMIN).m, create);
router.delete("/delete/:id", new Auth(AUTH_ADMIN).m, deleterank);
router.patch("/undelete/:id", new Auth(AUTH_ADMIN).m, undeleterank);
router.get("/:id", findById);
router.patch("/:id", new Auth(AUTH_ADMIN).m, updateById);

module.exports = router;
