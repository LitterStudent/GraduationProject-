const { sequelize } = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
// 定义关注模型
class Dynamic extends Model {}

// 初始关注模型
Dynamic.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "动态表主键ID",
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      // 备注
      comment: "用户id",
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment:
        "0-用户点赞了某个回答 1-用户赞了某篇文章  2-用户回答了问题 3用户创作了文章",
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
      defaultValue: 1,
      comment: "0-删除 1-正常",
    },
  },
  {
    sequelize,
    modelName: "dynamic",
    tableName: "dynamic",
  }
);

module.exports = Dynamic;
