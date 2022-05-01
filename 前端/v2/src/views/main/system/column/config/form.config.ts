import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 120,
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '专栏标题',
      placeholder: '请输入专栏标题'
    },
    {
      field: 'username',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'description',
      type: 'input',
      label: '专栏描述',
      placeholder: '请输入专栏描述'
    },
    {
      field: 'status',
      type: 'select',
      label: '回答状态',
      placeholder: '请输入回答状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      field: 'createTime',
      type: 'dateselect',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
