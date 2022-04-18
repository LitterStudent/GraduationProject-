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
