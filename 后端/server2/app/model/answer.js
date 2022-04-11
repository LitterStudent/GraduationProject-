const moment = require('moment');
const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
// 定义用户模型
class Answer extends Model {

}

// 初始用户模型
Answer.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '回答主键ID'
    },
    question_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // 备注
        comment: '所属问题的id'
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '创建回答的用户id'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "回答内容"
    },
    pageviews: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '回答的浏览量'
    },
    favorite_num: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '文章点赞次数'
    },
    admin_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        comment: '审核管理员ID'
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 2,
        comment: '回答状态:0-禁用,1-正常,2待审核'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '创建时间',
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    sequelize,
    modelName: 'answer',
    tableName: 'answer'
})

module.exports = Answer
