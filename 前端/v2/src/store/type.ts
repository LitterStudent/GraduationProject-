import { ILoginState } from './login/type'

export interface IRootState {
  name: string
  age: number
  entiretopic: any[]
  entireAnswer: any[]
  entireQuestion: any[]
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
