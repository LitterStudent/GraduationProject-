const moment = require('moment');
const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
// 定义专栏文章模型
class ColumnArticle extends Model {

}

// 初始专栏文章模型
ColumnArticle.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '专栏文章主键ID'
    },
    column_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '专栏id'
    },
    article_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: '文章id'
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: '状态:0-禁用,1-正常'
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
    modelName: 'column_article',
    tableName: 'column_article'
})

module.exports = ColumnArticle
