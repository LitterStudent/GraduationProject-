const moment = require('moment');
const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
// 定义用户模型
class Article extends Model {

}

// 初始用户模型
Article.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '文章主键ID'
    },
    topic_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // 备注
        comment: '所属话题的id'
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '创建文章的用户id'
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '文本标题'
    },
    cover_url: {
        type: DataTypes.STRING(256),
        defaultValue: "https://pic1.zhimg.com/v2-c951a81312d4457f3cfec3ce2f4ea261_is.jpg?source=32738c0c",
        allowNull: true,
        comment: '封面图片'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "文章内容"
    },
    pageviews: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '文章的浏览量'
    },
    favorite_num: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '文章点赞次数'
    },
    comment_num: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '文章评论数'
    },
    admin_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        comment: '审核管理员ID'
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 2,
        comment: '文章状态:0-禁用,1-正常,2待审核'
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
    modelName: 'article',
    tableName: 'article'
})

module.exports = Article
