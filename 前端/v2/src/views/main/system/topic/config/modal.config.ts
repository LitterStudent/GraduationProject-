import { IForm } from '@/base-ui/from/type'
export const modalconfig: IForm = {
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      label: '话题名称',
      type: 'input',
      field: 'topic_name',
      placeholder: '请输入查询的话题名称'
    },
    {
      label: '话题介绍',
      type: 'input',
      field: 'introduction',
      placeholder: '请输入话题介绍'
    },
    {
      label: '图片',
      field: 'avatar_url',
      slotName: 'picture'
    },
    {
      field: 'status',
      type: 'select',
      label: '话题状态',
      placeholder: '请输入话题状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}
