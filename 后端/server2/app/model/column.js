const moment = require('moment');
const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
// 定义用户模型
class Column extends Model {

}

// 初始用户模型
Column.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '专栏主键ID'
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '创建专栏的用户id'
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '专栏的标题'
    },
    description:{
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: '专栏的描述'
    },
    follow_num: {
        type: DataTypes.INTEGER(64),
        defaultValue: 0,
        comment: '文章的关注数'
    },
    article_num: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '专栏的文章数'
    },
    favorite_num: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '专栏内所有文章的总点赞次数'
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 2,
        comment: '专栏状态:0-禁用,1-正常'
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
    modelName: 'column',
    tableName: 'column'
})

module.exports = Column
