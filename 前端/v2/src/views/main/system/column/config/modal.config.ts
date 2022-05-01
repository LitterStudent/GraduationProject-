import { IForm } from '@/base-ui/from/type'
export const modalconfig: IForm = {
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '专栏标题',
      placeholder: '请输入专栏标题'
    },
    {
      field: 'description',
      type: 'input',
      label: '专栏描述',
      placeholder: '请输入专栏描述'
    }
  ]
}
