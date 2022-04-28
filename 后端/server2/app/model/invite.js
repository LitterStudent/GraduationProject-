const { sequelize } = require("../config/db");
const { DataTypes, Model } = require("sequelize");
const moment = require("moment");
// 定义关注模型
class Invite extends Model {}

// 初始关注模型
Invite.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: "邀请表主键ID",
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      // 备注
      comment: "用户id",
    },
    invited_user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: "被邀请回答用户id",
    },
    question_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
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
      defaultValue: 1,
      comment: "1-已邀请",
    },
  },
  {
    sequelize,
    modelName: "invite",
    tableName: "invite",
  }
);

module.exports = Invite;
