import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 120,
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '文章标题',
      placeholder: '请输入文章标题'
    },
    {
      field: 'username',
      type: 'input',
      label: '用户昵称',
      placeholder: '请输入用户昵称'
    },
    {
      field: 'topic_name',
      type: 'input',
      label: '话题名称',
      placeholder: '请输入话题名称'
    },
    {
      field: 'status',
      type: 'select',
      label: '文章状态',
      placeholder: '请输入回答状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
        { label: '待审核', value: 2 }
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
