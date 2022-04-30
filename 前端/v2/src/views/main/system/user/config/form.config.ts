import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 100,
  itemStyle: {
    padding: '10px 50px'
  },
  colLayout: {
    span: 8
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
      placeholder: '请输入用户居住地'
    },
    {
      field: 'business',
      type: 'input',
      label: '所处行业',
      placeholder: '请输入用户所处行业'
    },
    {
      field: 'status',
      type: 'select',
      label: '用户状态',
      placeholder: '请输入用户状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 }
      ]
    },
    {
      field: 'createAt',
      type: 'dateselect',
      label: '时间范围',
      placeholder: '请输入时间范围'
    }
  ]
}
