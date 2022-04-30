const Router = require("koa-router");
const router = new Router({ prefix: "/admin" });
const { create, login, findById } = require("../controller/admin");
const { Auth } = require("../utils/auth");

const AUTH_ADMIN = 16;
router.post("/", create);
router.post("/login", login);
router.get("/", new Auth(AUTH_ADMIN).m, findById);
module.exports = router;
