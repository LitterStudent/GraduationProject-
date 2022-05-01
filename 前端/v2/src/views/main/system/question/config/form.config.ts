import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 120,
  formItems: [
    {
      field: 'question_name',
      type: 'input',
      label: '问题名称',
      placeholder: '请输入问题名称'
    },
    {
      field: 'description',
      type: 'input',
      label: '问题描述',
      placeholder: '请输入问题描述'
    },
    {
      field: 'description',
      type: 'input',
      label: '问题描述',
      placeholder: '请输入问题描述'
    },
    {
      field: 'username',
      type: 'input',
      label: '用户名称',
      placeholder: '请输入提出问题的用户名称'
    },
    {
      field: 'topic_name',
      type: 'input',
      label: '话题名称',
      placeholder: '请输入问题所属的话题名称'
    },
    {
      field: 'status',
      type: 'select',
      label: '问题状态',
      placeholder: '请输入问题状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}
