import hdRequest from '@/service'
import { IDataType } from '@/service/type'
export function getPageListData(url: string, queryInfo: any) {
  return hdRequest.get<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return hdRequest.delete<IDataType>({
    url
  })
}

export function undeletePageData(url: string) {
  return hdRequest.patch<IDataType>({
    url
  })
}

export function editPageData(url: string, editData: any) {
  return hdRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}

export function createPageData(url: string, newData: any) {
  return hdRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function getAllTopic() {
  return hdRequest.get({
    url: '/topics/adminfind?per_page=1000'
  })
}

export function getOneAnswer(id: any) {
  return hdRequest.get({
    url: `/questions/1/answers/${id}`
  })
}

export function checkAnswer(url: any, id: any) {
  return hdRequest.patch({
    url: `${url}/${id}`
  })
}

export function getOneArticle(id: any) {
  return hdRequest.get({
    url: `/article/${id}`
  })
}
