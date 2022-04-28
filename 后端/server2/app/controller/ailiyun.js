// This file is auto-generated, don't edit it
let Dysmsapi20170525 = require("@alicloud/dysmsapi20170525");
Dysmsapi20170525 = Dysmsapi20170525.default;
const { SendSmsRequest } = require("@alicloud/dysmsapi20170525");
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
const { Config } = require("@alicloud/openapi-client");
class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId, accessKeySecret) {
    let config = new Config({
      // 您的AccessKey ID
      accessKeyId: accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
  }

  static async main(args) {
    let client = Client.createClient(
      "LTAI5tJBuY5GaMu6qFrdN2Pb",
      "SO8ApHAc2me0FY2qaz46EEuaAWeLaC"
    );
    let sendSmsRequest = new SendSmsRequest({
      signName: "阿里云短信测试",
      templateCode: "SMS_154950909",
      phoneNumbers: "13433638802",
      templateParam: '{"code":"1234"}',
    });
    // 复制代码运行请自行打印 API 的返回值
    try {
      await client.sendSms(sendSmsRequest);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Client;
// Client.main(process.argv.slice(2));
