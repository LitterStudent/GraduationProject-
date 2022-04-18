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

export function findAllAnswerRequest(id) {
  return hdRequest.get({
    url: `/questions/${id}/answers`
    })
}
