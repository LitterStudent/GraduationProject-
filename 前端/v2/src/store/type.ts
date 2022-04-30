import { ILoginState } from './login/type'

export interface IRootState {
  name: string
  age: number
  entiretopic: any[]
  entireRole: any[]
  entireQuestion: any[]
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
