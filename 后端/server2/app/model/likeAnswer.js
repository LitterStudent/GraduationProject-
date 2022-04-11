const { sequelize } = require('../config/db')
const { DataTypes, Model } = require('sequelize')
const moment = require('moment')
// 定义关注模型
class  LikeAnswer extends Model {

}

// 初始关注模型
LikeAnswer.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '点赞回答表主键ID'
    },
    user_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        // 备注
        comment: '用户id'
    },
    answer_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        comment: '回答id'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '点赞时间',
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1-点赞 0-取消点赞'
    }
}, {
    sequelize,
    modelName: 'like_answer',
    tableName: 'like_answer'
})

module.exports = LikeAnswer
