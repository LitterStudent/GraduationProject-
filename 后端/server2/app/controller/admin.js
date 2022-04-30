const { Admin } = require("../model/admin");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config/config");
const AUTH_ADMIN = 16;
class AdminCtl {
  async create(ctx) {
    ctx.verifyParams({
      nickname: { type: "string", required: true },
      password: { type: "string", required: true },
      email: { type: "string", required: true },
    });
    const { nickname, password, email } = ctx.request.body;
    const repeateAdmin = await Admin.findOne({
      where: {
        email,
      },
    });
    if (repeateAdmin) {
      ctx.throw(409, "该邮箱已经注册");
    }
    const admin = new Admin();
    admin.nickname = nickname;
    admin.email = email;
    admin.password = password;
    const res = await admin.save();
    const data = {
      code: 200,
      email: res.email,
      nickname: res.nickname,
    };
    ctx.body = data;
  }
  async findById(ctx) {
    const id = ctx.auth.id;
    const admin = await Admin.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });
    ctx.body = admin;
  }
  async login(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      ctx.throw(401, "用户名或者密码不正确");
    }
    const correct = bcrypt.compareSync(password, admin.password);
    if (!correct) {
      ctx.throw(401, "用户名或者密码错误");
    }
    const token = jsonwebtoken.sign(
      { email, scope: AUTH_ADMIN, id: admin.id },
      secret,
      { expiresIn: "1d" }
    );
    ctx.body = { token: token, id: admin.id };
  }
}

module.exports = new AdminCtl();
