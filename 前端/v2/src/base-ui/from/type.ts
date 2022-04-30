type IFromTypes = 'input' | 'password' | 'select' | 'dateselect'

export interface IFormItem {
  field: string
  type?: IFromTypes
  label?: string
  rules?: any[]
  placeholder?: string
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: number
  colLayout?: any
  itemStyle?: any
}
