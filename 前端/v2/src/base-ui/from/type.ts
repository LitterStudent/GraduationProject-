type IFromTypes = 'input' | 'password' | 'select' | 'dateselect'

export interface IFormItem {
  field: string
  slotName?: string
  type?: IFromTypes
  label?: string
  rules?: any[]
  placeholder?: string
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  title?: string
  formItems: IFormItem[]
  labelWidth?: number
  colLayout?: any
  itemStyle?: any
}
