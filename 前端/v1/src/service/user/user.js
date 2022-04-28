import hdRequest from '../index'

export function changeUserInfoRequest(user) {
  return hdRequest.patch({
    url: '/users/' + user.id,
    data: user
  })
}

export function getAllTopicRequest() {
  return hdRequest.get({
    url: '/topics'
  })
}

// 查找用户所有的提问
export function getUserAllQuestion(userId) {
  return hdRequest.get({
    url: `/users/${userId}/questions`
  })
}
export function addQuestionRequest(question) {
  return hdRequest.post({
    url: '/questions',
    data: question
  })
}
export function findQuestionRequest(id) {
  return hdRequest.get({
    url: `/questions/${id}`
  })
}

export function createAnswerRequest(id, data) {
  return hdRequest.post({
    url: `/questions/${id}/answers`,
    data
  })
}

export function updateAnswerRequest(id, id2, data) {
  return hdRequest.patch({
    url: `/questions/${id}/answers/${id2}`,
    data
  })
}

export function findAllAnswerRequest(id) {
  return hdRequest.get({
    url: `/questions/${id}/answers`
  })
}

export function finOneAnswerRequest(id, id2) {
  return hdRequest.get({
    url: `/questions/${id}/answers/${id2}`
  })
}

export function finUserAnswerRequest(id, id2) {
  return hdRequest.get({
    url: `/questions/${id}/answers/user/${id2}`
  })
}

export function deleteUserAnswerRequest(id, id2) {
  return hdRequest.delete({
    url: `/questions/${id}/answers/${id2}`
  })
}

export function getUserFollowQuestionList(userid) {
  return hdRequest.get({
    url: `/users/${userid}/followingquestion`
  })
}

export function followQuestion(questionid) {
  return hdRequest.put({
    url: `/users/followingquestion/${questionid}`
  })
}

export function unfollowQuestion(questionid) {
  return hdRequest.delete({
    url: `/users/followingquestion/${questionid}`
  })
}

export function likeAnswer(answerId) {
  return hdRequest.put({
    url: `/users/likinganswer/${answerId}`
  })
}

export function unlikeAnswer(answerId) {
  return hdRequest.delete({
    url: `/users/likinganswer/${answerId}`
  })
}

export function userlikeAnswerList(userId) {
  return hdRequest.get({
    url: `/users/${userId}/likinganswer`
  })
}

// 创建一级评论
export function createUserCommentone(answerId, data) {
  return hdRequest.post({
    url: `/comment/answer/${answerId}`,
    data
  })
}

// 删除一级评论
export function deleteUserCommentone(commentId, data) {
  return hdRequest.delete({
    url: `/comment/answer/${commentId}`,
    data
  })
}
// 创建二级评论
export function createUserCommenttwo(commentId, data) {
  return hdRequest.post({
    url: `/comment/${commentId}/replyComment`,
    data
  })
}

export function getComentOneList(answerId) {
  return hdRequest.get({
    url: `/comment/answer/${answerId}`
  })
}
export function getComentTwoList(answerId) {
  return hdRequest.get({
    url: `/comment/answer/${answerId}/replycomment`
  })
}

export function getUserInfo(userId) {
  return hdRequest.get({
    url: `/users/${userId}`
  })
}
//获取某个用户的粉丝列表
export function getUserFollowerList(userId) {
  return hdRequest.get({
    url: `/users/${userId}/followers`
  })
}
// 获取某个用户的关注列表
export function getUserFollowList(userId) {
  return hdRequest.get({
    url: `/users/${userId}/following`
  })
}

export function followUser(userId) {
  return hdRequest.put({
    url: `/users/following/${userId}`
  })
}

export function unfollowUser(userId) {
  return hdRequest.delete({
    url: `/users/unfollowing/${userId}`
  })
}

// 获取用户的点赞数
export function belikedNum(userId) {
  return hdRequest.get({
    url: `/users/${userId}/belikednum`
  })
}

// 获取用户的所有回答
export function getUserAllAnswer(userId) {
  return hdRequest.get({
    url: `/users/${userId}/allAnswer`
  })
}
// 获取用户的所有文章
export function getUserAllArticle(userId) {
  return hdRequest.get({
    url: `/users/${userId}/allArticle`
  })
}

// 获取某个用户的粉丝列表
export function getUserAllFollower(userId) {
  return hdRequest.get({
    url: `/users/${userId}/followers`
  })
}

// 用户关注的专栏
export function getUserFollowColumn(userId) {
  return hdRequest.get({
    url: `/users/${userId}/followingcolumn`
  })
}

// 用户创建的专栏
export function getUserAllColumn(userId) {
  return hdRequest.get({
    url: `/users/${userId}/findallcolumn`
  })
}
// 用户创建专栏
export function createColumn(data) {
  return hdRequest.post({
    url: `/column`,
    data
  })
}

// 用户创建文章
export function createArticle(data) {
  return hdRequest.post({
    url: `/article/`,
    data
  })
}

// 获取用户文章
export function getUserArticle(articleId) {
  return hdRequest.get({
    url: `/article/${articleId}`
  })
}

// 用户关注的话题
export function getUserFollowTopic(userId) {
  return hdRequest.get({
    url: `/users/${userId}/followingTopic`
  })
}

// 获取用户的邀请其他用户回答列表
export function getUserInviteOtherList(questionId) {
  return hdRequest.get({
    url: `/questions/${questionId}/invite/userlist`
  })
}

// 邀请用户回答问题
export function InviteUserAnswer(questionId, userId) {
  return hdRequest.patch({
    url: `/questions/${questionId}/invite/${userId}`
  })
}
