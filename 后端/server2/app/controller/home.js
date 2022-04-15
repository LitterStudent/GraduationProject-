const path = require("path");
class Home {
  index(ctx) {
    ctx.body = "这是首页";
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const baseName = path.basename(file.path);
    ctx.body = {
      errno: 0, // 注意：值是数字，不能是字符串
      data: {
        url: `${ctx.origin}/uploads/${baseName}`, // 图片 src ，必须
        alt: "baseName", // 图片描述文字，非必须
        href: "zzz", // 图片的链接，非必须
      },
    };
  }
}

module.exports = new Home();
