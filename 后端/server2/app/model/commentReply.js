const moment = require('moment');

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../config/db')
// const { Comment } = require('@models/comment')

class CommentReply extends Model {

}

CommentReply.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '回复主键ID'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '回复内容'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,
    comment: '回复状态：0-删除 1正常'
  },
  comment_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的评论ID'
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
    comment: '发表回复的用户ID'
  },
  reply_user_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '回复对象ID'
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
  tableName: 'comment_reply',
  modelName: 'comment_reply'
})

// 一对多：评论表下拥有多个评论
// Comment.hasMany(Reply, {
//   foreignKey: 'comment_id',
//   sourceKey: 'id',
//   as: 'reply'
// })
//
// Reply.belongsTo(Comment, {
//   foreignKey: 'comment_id',
//   targetKey: 'id',
//   as: 'comment'
// })

module.exports = CommentReply
