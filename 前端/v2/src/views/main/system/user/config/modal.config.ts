import { IForm } from '@/base-ui/from/type'
export const modalconfig: IForm = {
  title: '用户信息',
  labelWidth: 100,
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'username',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'phone',
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号'
    },
    {
      field: 'location',
      type: 'input',
      label: '居住地',
      placeholder: '请输入用户居住地',
      isHidden: false
    },
    {
      field: 'business',
      type: 'input',
      label: '所处行业',
      placeholder: '请输入用户所处行业',
      options: []
    },
    {
      field: 'gender',
      type: 'select',
      label: '性别',
      placeholder: '请输入性别',
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
      ]
    }
  ]
}
