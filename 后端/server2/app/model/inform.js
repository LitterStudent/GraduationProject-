const { sequelize } = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
// 定义关注模型
class Inform extends Model {}

// 初始关注模型
Inform.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "通知表主键ID",
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      // 备注
      comment: "发出通知用户id",
    },
    inform_user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "接收通知用户id",
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment:
        "0-用户A点赞了用户B的某个回答 1-用户A点赞了用户B的某篇文章 3-用户A评论了用户B的某个回答 4-用户A评论了用户B的某篇文章 5-用户A关注了用户 6用户A邀请用户B回答问题",
    },
    answer_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      comment: "回答id",
    },
    article_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      comment: "文章id",
    },
    question_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      comment: "问题id",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "关注时间",
      get() {
        return moment(this.getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "0-未读 1-已读 2-删除",
    },
  },
  {
    sequelize,
    modelName: "inform",
    tableName: "inform",
  }
);

module.exports = Inform;
