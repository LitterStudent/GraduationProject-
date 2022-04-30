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
