const moment = require('moment');

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/db')

class Comment extends Model {

}

Comment.init({
  id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '评论主键ID'
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '评论类型：0-文章 1回答'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,
    comment: '评论状态：0-删除 1正常'
  },
  answer_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的回复ID'
  },
  user_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '评论用户ID'
  },
  reply_count: {
    type: DataTypes.INTEGER(64),
    defaultValue: 0,
    comment: '评论的回复数（二级评论的数量）'  
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
  modelName: 'comment',
  tableName: 'comment'
})

module.exports = Comment
