import { IForm } from '@/base-ui/from/type'
export const modalconfig: IForm = {
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入ID'
    },
    {
      label: '分类名称',
      type: 'input',
      field: 'name',
      placeholder: '请输入分类名称'
    }
  ]
}
