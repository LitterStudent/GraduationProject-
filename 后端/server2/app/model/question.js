const moment = require('moment');
const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
// 定义用户模型
class Question extends Model {

}

// 初始用户模型
Question.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '问题主键ID'
    },
    question_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // 备注
        comment: '问题名称'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "问题描述"
    },
    created_user: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '创建问题的用户id'
    },
    topic_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '问题所属的话题id'       
    },
    answer_number: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '问题的回答数'
    },
    follow_number: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '问题的关注人数'        
    },
    pageviews: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '问题的浏览量'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 2,
        comment: '问题状态:0-禁用,1-正常,2待审核'
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
    modelName: 'question',
    tableName: 'question'
})

module.exports = Question
