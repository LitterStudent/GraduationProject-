const moment = require('moment');
const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
// 定义用户模型
class Topic extends Model {

}

// 初始用户模型
Topic.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '话题主键ID'
    },
    topic_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // 备注
        comment: '话题昵称'
    },
    avatar_url: {
        type: DataTypes.STRING(256),
        defaultValue: "https://pic1.zhimg.com/v2-f94b3093434c09b4501b056d142025e0_qhd.jpg?source=57bbeac9",
        comment: '话题图片'
    },
    introduction: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "话题简介"
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: '话题状态:0-禁用,1-正常'
    },
    question_num: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '话题的问题数'
    },
    article_num: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '话题的文章数'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '创建时间',
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    created_admin: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '创建话题的管理员id'
    }
}, {
    sequelize,
    modelName: 'topic',
    tableName: 'topic'
})

module.exports = Topic
