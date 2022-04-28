class Home {
  index(ctx) {
    ctx.body = "这是首页";
  }
  async upload(ctx) {
    const file = ctx.request.files.file;
    const baseName = path.basename(file.path);
    const url = await put(baseName);
    ctx.body = {
      errno: 0, // 注意：值是数字，不能是字符串
      data: {
        url: url, //`${ctx.origin}/uploads/${baseName}`, // 图片 src ，必须
        alt: "baseName", // 图片描述文字，非必须
        href: "zzz", // 图片的链接，非必须
      },
    };
  }
}

const OSS = require("ali-oss");
const path = require("path");

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: "oss-cn-beijing",
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: "LTAI5tJBuY5GaMu6qFrdN2Pb",
  accessKeySecret: "SO8ApHAc2me0FY2qaz46EEuaAWeLaC",
  // 填写Bucket名称。关于Bucket名称命名规范的更多信息，请参见Bucket。
  bucket: "dongboke",
});

const headers = {
  // 指定该Object被下载时网页的缓存行为。
  // 'Cache-Control': 'no-cache',
  // 指定该Object被下载时的名称。
  // 'Content-Disposition': 'oss_download.txt',
  // 指定该Object被下载时的内容编码格式。
  // 'Content-Encoding': 'UTF-8',
  // 指定过期时间。
  // 'Expires': 'Wed, 08 Jul 2022 16:57:01 GMT',
  // 指定Object的存储类型。
  // 'x-oss-storage-class': 'Standard',
  // 指定Object的访问权限。
  // 'x-oss-object-acl': 'private',
  // 设置Object的标签，可同时设置多个标签。
  // 'x-oss-tagging': 'Tag1=1&Tag2=2',
  // 指定CopyObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  // 'x-oss-forbid-overwrite': 'true',
};

async function put(name) {
  try {
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(
      name,
      path.resolve("./app/public/uploads/" + name),
      {
        headers,
      }
    );
    // console.log(result.res.requestUrls);
    return result.res.requestUrls;
  } catch (e) {
    console.log(e);
  }
}

module.exports = new Home();
