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
export function createUserCommentone(answerId, data, type) {
  return hdRequest.post({
    url: `/comment/${type}/${answerId}`,
    data
  })
}

// 删除一级评论
export function deleteUserCommentone(commentId, type) {
  return hdRequest.delete({
    url: `/comment/${type}/${commentId}`
  })
}
// 创建二级评论
export function createUserCommenttwo(commentId, data) {
  return hdRequest.post({
    url: `/comment/${commentId}/replyComment`,
    data
  })
}

// 获取一级评论
export function getComentOneList(answerId, commentType) {
  return hdRequest.get({
    url: `/comment/${commentType}/${answerId}`
  })
}
// 获取二级评论
export function getComentTwoList(answerId, commentType) {
  return hdRequest.get({
    url: `/comment/${commentType}/${answerId}/replycomment`
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

// 获取用户的所有点赞文章列表
export function getUserAllArticlelike(userId) {
  return hdRequest.get({
    url: `/users/${userId}/likingarticle`
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
// 用户更新专栏
export function updateColumn(id, data) {
  return hdRequest.patch({
    url: `/column/${id}`,
    data
  })
}
// 用户删除专栏
export function deleteColumn(id) {
  return hdRequest.delete({
    url: `/column/${id}`
  })
}
// 查询某个专栏下的所有文章
export function getColumnAllArticle(columnId) {
  return hdRequest.get({
    url: `/column/${columnId}/article`
  })
}
// 查询某个专栏下的未收录的文章
export function getArticleNoInColumn(columnId) {
  return hdRequest.get({
    url: `/column/${columnId}/collectarticle`
  })
}
// 将某篇文章收纳至专栏下
export function collectArticletoColumn(columnId, articleId) {
  return hdRequest.patch({
    url: `/column/${columnId}/article/${articleId}`
  })
}
// 取消某篇文章收纳至专栏下
export function deleteArticlefromColumn(columnId, articleId) {
  return hdRequest.delete({
    url: `/column/${columnId}/article/${articleId}`
  })
}
// 用户创建文章
export function createArticle(data) {
  return hdRequest.post({
    url: `/article/`,
    data
  })
}

// 用户更新文章
export function updateArticle(article_id, data) {
  return hdRequest.patch({
    url: `/article/${article_id}`,
    data
  })
}

// 用户点赞文章
export function likeArticle(article_id) {
  return hdRequest.put({
    url: `/users/likingarticle/${article_id}`
  })
}

// 用户取消点赞文章
export function unlikeArticle(article_id) {
  return hdRequest.delete({
    url: `/users/likingarticle/${article_id}`
  })
}
// 用户删除文章
export function deleteArticle(article_id) {
  return hdRequest.delete({
    url: `/article/${article_id}`
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

// 获取用户最近通知
export function getUserInform(userId) {
  return hdRequest.get({
    url: `/users/${userId}/inform`
  })
}
// 已读用户最近通知
export function readUserInform(userId) {
  return hdRequest.patch({
    url: `/users/${userId}/readinform`
  })
}

// 获取首页推荐列表
export function getIndexRecomment(page) {
  return hdRequest.get({
    url: `/users/1/recommend?page=${page}`
  })
}

// 获取用户动态
export function getUserDynamic(userId) {
  return hdRequest.get({
    url: `/users/${userId}/dynamic`
  })
}


// 获取首页关注动态列表
export function getFollowUserDynamic(userId) {
  return hdRequest.get({
    url: `/users/${userId}/followerrecommend`
  })
}
