import { IForm } from '@/base-ui/from/type'
export const modalconfig: IForm = {
  itemStyle: {},
  colLayout: {
    span: 24
  },
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
      field: 'topic_name',
      type: 'select',
      label: '所属话题',
      placeholder: '请选择话题',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}
