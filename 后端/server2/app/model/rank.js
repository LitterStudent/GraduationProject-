const moment = require("moment");
const { sequelize } = require("../config/db");
const { DataTypes, Model } = require("sequelize");
// 定义用户模型
class Rank extends Model {}

// 初始用户模型
Rank.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键ID",
    },
    question_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      // 备注
      comment: "问题ID",
    },
    rank_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      comment: "排行名次",
    },
    cover_url: {
      type: DataTypes.STRING(256),
      defaultValue:
        "https://pic1.zhimg.com/v2-f94b3093434c09b4501b056d142025e0_qhd.jpg?source=57bbeac9",
      comment: "封面图片",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: "状态:0-禁用,1-正常",
    },
    admin_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: "管理员id",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间",
      get() {
        return moment(this.getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      },
    },
  },
  {
    sequelize,
    modelName: "rank",
    tableName: "rank",
  }
);

module.exports = Rank;
